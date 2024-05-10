import {IResponse} from "@/types/api";
import {IAsset} from "@/modules/cards/types/portfolio";
import {IPortfolioAssetsStatisticsFilters, IPortfolioAssetsStatisticsResponse} from "../../types/assetsStatistics";

class AnalyticsAPI {
  constructor(protected readonly url: string) {}
  async getAssets({ownerId, portfolioId}: Partial<IPortfolioAssetsStatisticsFilters>, token: string): Promise<IResponse<IPortfolioAssetsStatisticsResponse>> {
    try {
      let queryParams;
      if(ownerId) {
        queryParams = new URLSearchParams({
          ownerId
        });
      } else if(portfolioId) {
        queryParams = new URLSearchParams({
          portfolioId
        });
      } else {
        throw ("No assets were found");
      }
      const response = await fetch(`${this.url}/assets?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
      });
      const result = await response.json();
      if(!response.ok) throw (result);
      const total = (Object.values(result.data || {}) as IAsset[]).reduce((res: number, el: IAsset) => {
        res += el.amount * el.avgBuyPrice;
        return res;
      }, 0);
      return ({
        ...result,
        data: {
          total,
          data: result.data || {},
        },
      });
    } catch (error) {
      throw (error as string);
    }
  }
}

export const analyticsAPI = new AnalyticsAPI(`${process.env.NEXT_PUBLIC_API_URL}/portfolio-analytics`);