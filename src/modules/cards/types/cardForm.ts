import {ICardsResponse} from "..";

export interface ICardForm extends Pick<ICardsResponse, "title"|"balance"|"color"|"currency"> {}