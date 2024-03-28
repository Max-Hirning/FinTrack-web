import {ICurrencyResponse} from "@/types/currency";
import {getDateRangeObject} from "@/controllers/dates";
import {ITransactionResponse, transactionsAPI} from "@/modules/transactions";
import {IYearlyStatisticsResponse} from "@/modules/analytics/types/yearlyStatistics";

export async function GET(request: Request): Promise<Response> {
  const {searchParams} = new URL(request.url);

  const filters = searchParams.get("filters");
  const currency = searchParams.get("currency");
  
  const authHeader = request.headers.get("authorization");
  if(!authHeader) throw ("Invalid token");
  const bearer = authHeader.split(" ")[0];
  const token = authHeader.split(" ")[1];
  if(bearer !== "Bearer" || !token) throw ("Invalid token");
  if(currency && filters) {
    const responseObj = getDateRangeObject(JSON.parse(filters).date[0], JSON.parse(filters).date[1], "m", {incomes: 0, expenses: 0});
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
    (transactions.data?.data.data || []).map((el: ITransactionResponse) => {
      const date = new Date(el.date).toISOString().split("T")[0];
      const month = new Date(date).getMonth()+1;
      if(responseObj[month]) {
        const currencyRate = currenciesRates?.rates[`${date}T23:59:00.000Z`]?.[el.card.currency];
        if(currencyRate) {
          if(el.amount < 0) {
            (responseObj[month] as IYearlyStatisticsResponse).expenses = +((responseObj[month] as IYearlyStatisticsResponse).expenses + +((Math.abs(el.amount) / +(currencyRate.toFixed(2))).toFixed(2))).toFixed(2);
          } else if(el.amount > 0) {
            (responseObj[month] as IYearlyStatisticsResponse).incomes = +((responseObj[month] as IYearlyStatisticsResponse).incomes + +((Math.abs(el.amount) / +(currencyRate.toFixed(2))).toFixed(2))).toFixed(2);
          }
        } else {
          if(el.amount < 0) {
            (responseObj[month] as IYearlyStatisticsResponse).expenses = +((responseObj[month] as IYearlyStatisticsResponse).expenses + Math.abs(el.amount)).toFixed(2);
          } else if(el.amount > 0) {
            (responseObj[month] as IYearlyStatisticsResponse).incomes = +((responseObj[month] as IYearlyStatisticsResponse).incomes + Math.abs(el.amount)).toFixed(2);
          }
        }
      }
    });
    return Response.json({
      statusCode: 200,
      data: responseObj,
      message: "Yearly statistics were calculated",
    });
  }
  return Response.json({
    data: [],
    statusCode: 200,
    message: "Yearly statistics were calculated",
  });
}