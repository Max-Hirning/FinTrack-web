import {ICurrencyResponse} from "@/types/currency";
import {IAccountResponse} from "@/modules/analytics";
import {ICardResponse, cardAPI} from "@/modules/cards";
import {ITransactionResponse, transactionsAPI} from "@/modules/transactions";

export async function GET(request: Request): Promise<Response> {
  const {searchParams} = new URL(request.url);

  const currency = searchParams.get("currency");
  const cardsFilters = searchParams.get("cards");
  const transactionsFilters = searchParams.get("transactions");

  const authHeader = request.headers.get("authorization");
  if(!authHeader) throw ("Invalid token");
  const bearer = authHeader.split(" ")[0];
  const token = authHeader.split(" ")[1];
  if(bearer !== "Bearer" || !token) throw ("Invalid token");

  if(currency && cardsFilters && transactionsFilters) {
    let currenciesRates: ICurrencyResponse<{[key: string]: number}>|null = null;
    const cards = await cardAPI.getAll(JSON.parse(cardsFilters), token);
    const transactions = await transactionsAPI.getAll(JSON.parse(transactionsFilters), token);
    const currencies = new Set(cards.data?.currencies);
    currencies.delete(currency);
    if(currencies.size > 0 ) {
      const response = await fetch(`https://api.fxratesapi.com/latest?base=${currency}&currencies=${Array.from(currencies).join(",")}&resolution=1m&amount=1&places=6&format=json`);
      currenciesRates = await response.json();
    }
    const totalExpensesIncomes: Pick<IAccountResponse, "incomes"|"expenses"> = (transactions.data?.data.data || []).reduce((res: Pick<IAccountResponse, "incomes"|"expenses">, el: ITransactionResponse): Pick<IAccountResponse, "incomes"|"expenses"> => {
      if(el.amount > 0) {
        if((currency !== el.card.currency) && currenciesRates) {
          res.incomes = res.incomes + +((el.amount / currenciesRates.rates[el.card.currency]).toFixed(2));
        } else {
          res.incomes = res.incomes + +(el.amount.toFixed(2));
        }
      } else if(el.amount < 0) {
        if((currency !== el.card.currency) && currenciesRates) {
          res.expenses = res.expenses + +((el.amount / currenciesRates.rates[el.card.currency]).toFixed(2));
        } else {
          res.expenses = res.expenses + +(el.amount.toFixed(2));
        }
      }
      return res;
    }, {incomes: 0, expenses: 0});
    const totalBalance: number = (cards.data?.cards || []).reduce((res: number, el: ICardResponse): number => {
      if((currency !== el.currency) && currenciesRates) {
        res = res + +((el.balance / currenciesRates.rates[el.currency]).toFixed(2));
      } else {
        res = res + +(el.balance.toFixed(2));
      }
      return res;
    }, 0);
    return Response.json({
      statusCode: 200,
      message: "Account info was calculated",
      data: {...totalExpensesIncomes, balance: totalBalance},
    });
  }
  return Response.json({
    statusCode: 200,
    message: "Account info was calculated",
    data: {incomes: 0, expenses: 0, balance: 0}
  });
}