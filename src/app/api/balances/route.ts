import {IBalanceResponse} from "@/types/balances";
import {ICurrencyResponse} from "@/types/currency";
import {balancesAPI} from "@/controllers/api/balances";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);

  const filters = searchParams.get("filters");
  const currency = searchParams.get("currency");
  
  const authHeader = request.headers.get("authorization");
  if(!authHeader) throw new Error("Invalid token");
  const bearer = authHeader.split(" ")[0];
  const token = authHeader.split(" ")[1];
  if(bearer !== "Bearer" || !token) throw new Error("Invalid token");
  if(currency && filters) {
    const balances = await balancesAPI.getAll(JSON.parse(filters), token);
    const response: {[key: string]: {balance: number, cardIds: string[]}} = {};
    const currencies = new Set(balances.data?.currencies);
    currencies.delete(currency);
    let currenciesRates: ICurrencyResponse<{[key: string]: {[key: string]: number}}>|null = null;
    if(currencies.size > 0) {
      const [start, end] = JSON.parse(filters).date;
      const url = `https://api.fxratesapi.com/timeseries?start_date=${new Date(start).toISOString()}&end_date=${(new Date(end) < new Date()) ? new Date(end).toISOString() : new Date().toISOString()}&api_key=${process.env.ACCESS_TOKEN_CURRENCY}&base=${currency}&currencies=${Array.from(currencies).join(",")}&format=json`;
      const response = await fetch(url);
      currenciesRates = await response.json();
    }
    let prevBal = 0, lastDate = ""; 
    (balances.data?.data || []).map((el: IBalanceResponse) => {
      let balance = 0;
      const date = new Date(el.date).toISOString().split("T")[0];
      const currencyRate = currenciesRates?.rates[`${date}T23:59:00.000Z`]?.[el.card.currency];
      if(response[lastDate]) {
        if((!(new Set(response[lastDate].cardIds).has(el.card._id.toString())) || prevBal > 0)) prevBal = response[lastDate].balance;
      }
      if(currencyRate) {
        balance = +((el.balance / +(currencyRate.toFixed(2))).toFixed(2)) + ((lastDate === el.date) ? 0 : prevBal);
      } else {
        balance = el.balance + ((lastDate === el.date) ? 0 : prevBal);
      }
      if(response[el.date]) {
        response[el.date].balance += +(balance.toFixed(2));
        response[el.date].cardIds.push(el.card._id.toString());
      } else {
        response[el.date] = {
          balance: +(balance.toFixed(2)),
          cardIds: [el.card._id.toString()],
        };
      }
      lastDate = el.date;
    });
    return Response.json({
      data: response,
      statusCode: 200,
      message: "Balances were found",
    });
  }
  return Response.json({
    data: {},
    statusCode: 200,
    message: "Cards expenses were calculated",
  });
}