import {ICardResponse} from "@/modules/cards";

export interface ICardForm extends Pick<ICardResponse, "_id"|"title"|"balance"|"color"|"currency"> {}