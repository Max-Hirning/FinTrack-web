import {IPortfolioResponse} from "@/modules/cards";

export interface IPortfolioForm extends Pick<IPortfolioResponse, "_id"|"title"|"color"> {}