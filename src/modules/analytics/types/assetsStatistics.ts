import {IAsset} from "@/modules/cards/types/portfolio";

export interface IPortfolioAssetsStatisticsFilters {
  ownerId: string;
  portfolioId: string;
}
export interface IPortfolioAssetsStatisticsResponse {
  data: {
    [key: string]: IAsset;
  }
  total: number;
}