import {ICardsResponse} from "@/modules/cards";

export interface ICardForm extends Pick<ICardsResponse, "id"|"title"|"balance"|"color"|"currency"> {}