import {ICurrencyResponse} from "@/types/currency";
import {ICardsExpensesResponse} from "@/modules/analytics";
import {ITransactionResponse, transactionsAPI} from "@/modules/transactions";

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
    let currenciesRates: ICurrencyResponse<{[key: string]: {[key: string]: number}}>|null = null;
    const transactions = await transactionsAPI.getAll(JSON.parse(filters), token);
    // const currencies = new Set(transactions.data?.data.currencies);
    const currencies = new Set(["UAH", "GBP"]);
    currencies.delete(currency);
    if(currencies.size > 0) {
      const [start, end] = JSON.parse(filters).dates;
      const url = `https://api.fxratesapi.com/timeseries?start_date=${new Date(start).toISOString()}&end_date=${(new Date(end) < new Date()) ? new Date(end).toISOString() : new Date().toISOString()}&api_key=fxr_demo_asdiksd21&base=${currency}&currencies=${Array.from(currencies).join(",")}&format=json`;
      // const response = await fetch(`https://api.fxratesapi.com/latest?base=${currency}&currencies=${Array.from(currencies).join(",")}&resolution=1m&amount=1&places=6&format=json`);
      const response = await fetch(url);
      currenciesRates = await response.json();
    }
    
    const cardsExpenses = (transactions.data?.data.data || []).reduce((res: {[key: string]: ICardsExpensesResponse}, el: ITransactionResponse) => {
      console.log(currenciesRates?.rates, currenciesRates?.rates[`${el.date.split("T")[0]}T23:59:00.000Z`], `${el.date.split("T")[0]}T23:59:00.000Z`);
      if(el.amount < 0) {
        if(res[el.card._id]) {
          // if(currenciesRates?.rates[el.card.currency]) {
          //   res[el.card._id].amount += el.amount;
          //   res[el.card._id].amount = res[el.card._id].amount + +((el.amount / currenciesRates.rates[el.card.currency]).toFixed(2));
          // } else {
          res[el.card._id].amount += el.amount;
          // }
        } else {
          res[el.card._id] = {
            amount: el.amount,
            color: el.card.color,
            label: el.card.title,
            currency: el.card.currency,
          };
        }
      }
      return res;
    }, {});
    console.log(cardsExpenses);
  }
  return Response.json({
    statusCode: 200,
    message: "Cards expenses were calculated",
    data: {incomes: 0, expenses: 0, balance: 0}
  });
}