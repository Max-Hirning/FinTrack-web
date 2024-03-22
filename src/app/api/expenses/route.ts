import {ICurrencyResponse} from "@/types/currency";
import {IExpensesResponse} from "@/modules/analytics/types/expensesStatistics";
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
    const currencies = new Set(transactions.data?.data.currencies);
    currencies.delete(currency);
    if(currencies.size > 0) {
      const [start, end] = JSON.parse(filters).date;
      const url = `https://api.fxratesapi.com/timeseries?start_date=${new Date(start).toISOString()}&end_date=${(new Date(end) < new Date()) ? new Date(end).toISOString() : new Date().toISOString()}&api_key=${process.env.ACCESS_TOKEN_CURRENCY}&base=${currency}&currencies=${Array.from(currencies).join(",")}&format=json`;
      const response = await fetch(url);
      currenciesRates = await response.json();
    }
    const cardsExpenses = (transactions.data?.data.data || []).reduce((res: {[key: string]: IExpensesResponse}, el: ITransactionResponse) => {
      if(el.amount < 0) {
        const currencyRate = currenciesRates?.rates[`${el.date.split("T")[0]}T23:59:00.000Z`]?.[el.card.currency];
        if(currencyRate) {
          if(res[el.category._id]) {
            res[el.category._id].amount = +(res[el.category._id].amount + +((el.amount / +(currencyRate.toFixed(2))).toFixed(2))).toFixed(2);
          } else {
            res[el.category._id] = {
              color: el.category.color,
              label: el.category.title,
              amount: +((el.amount / +(currencyRate.toFixed(2))).toFixed(2)),
            };
          }
        } else {
          if(res[el.category._id]) {
            res[el.category._id].amount = +(res[el.category._id].amount + +((el.amount).toFixed(2))).toFixed(2);
          } else {
            res[el.category._id] = {
              color: el.category.color,
              label: el.category.title,
              amount: +((el.amount).toFixed(2)),
            };
          }
        }
      }
      return res;
    }, {});
    return Response.json({
      statusCode: 200,
      data: Object.values(cardsExpenses),
      message: "Expenses were calculated",
    });
  }
  return Response.json({
    data: [],
    statusCode: 200,
    message: "Expenses were calculated",
  });
}