import {IAccountResponse} from "@/modules/analytics";
import {ICardResponse, cardAPI} from "@/modules/cards";
import {ITransactionResponse, transactionsAPI} from "@/modules/transactions";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);

  const currency = searchParams.get("currency");
  const cardsFilters = searchParams.get("cards");
  const transactionsFilters = searchParams.get("transactions");

  const authHeader = request.headers.get("authorization");
  if(!authHeader) throw new Error("Invalid token");
  const bearer = authHeader.split(" ")[0];
  const token = authHeader.split(" ")[1];
  if(bearer !== "Bearer" || !token) throw new Error("Invalid token");

  if(currency && cardsFilters && transactionsFilters) {
    const cards = await cardAPI.getAll(JSON.parse(cardsFilters), token);
    const currencies = new Set(cards.data?.map(({currency}: ICardResponse) => currency));
    const transactions = await transactionsAPI.getAll(JSON.parse(transactionsFilters), token);
    
    currencies.delete(currency);
    const response = await fetch(`https://api.fxratesapi.com/latest?base=${currency}&currencies=${Array.from(currencies).join(",")}&resolution=1m&amount=1&places=6&format=json`);
    const currenciesRates = await response.json();
    
    const totalExpensesIncomes: Pick<IAccountResponse, "incomes"|"expenses"> = (transactions.data?.data || []).reduce((res: Pick<IAccountResponse, "incomes"|"expenses">, el: ITransactionResponse): Pick<IAccountResponse, "incomes"|"expenses"> => {
      if(el.ammount > 0) {
        if(currency !== el.card.currency) {
          res.incomes = res.incomes + +((el.ammount / currenciesRates.rates[el.card.currency]).toFixed(2));
        } else {
          res.incomes = res.incomes + +(el.ammount.toFixed(2));
        }
      } else if(el.ammount < 0) {
        if(currency !== el.card.currency) {
          res.expenses = res.expenses + +((el.ammount / currenciesRates.rates[el.card.currency]).toFixed(2));
        } else {
          res.expenses = res.expenses + +(el.ammount.toFixed(2));
        }
      }
      return res;
    }, {incomes: 0, expenses: 0});
    const totalBalance: number = (cards.data || []).reduce((res: number, el: ICardResponse): number => {
      if(currency !== el.currency) {
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