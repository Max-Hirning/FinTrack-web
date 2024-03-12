import {ICardResponse} from "@/modules/cards";

export interface ICardForm extends Pick<ICardResponse, "id"|"title"|"balance"|"color"|"currency"> {}