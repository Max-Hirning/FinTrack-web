import {IUserResponse} from "@/modules/profile";

export interface IAsset {
  asset: string;
  amount: number;
  avgBuyPrice: number;
}
export interface IPortfolio {
  assets: {
    [key: string]: IAsset;
  },
  _id: string;
  title: string;
  color: string;
  balance: number;
  currency: string;
  owner: Omit<IUserResponse, "cardIds"> & Partial<Pick<IUserResponse, "avatar">>;
}
export interface IPortfoliosFilters {
  ownerId: string;
  portfolios: string[];
}
export interface IPortfoliosListResponse {
  currencies: string[];
  portfolios: IPortfolio[];
}