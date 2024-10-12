type currencies = "USD" | "UAH" | "PLN" | "JPY" | "GBP" | "AUD" | "CAD" | "CHF" | "EUR";

interface ICurrencyResponse {
  title: string;
  image: string;
  id: currencies;
}

export type {
  ICurrencyResponse,
  currencies
}