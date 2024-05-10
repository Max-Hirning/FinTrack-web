import {IResponse} from "@/types/api";
import {IPortfoliosFilters, IPortfoliosListResponse} from "../../types/portfolio";

class PortfolioAPI {
  constructor(protected readonly url: string) {}

  async getAll({ownerId}: Pick<IPortfoliosFilters, "ownerId">, token: string): Promise<IResponse<IPortfoliosListResponse>> {
    try {
      if(!(ownerId && token)) throw ("No portfolios were found");
      const response = await fetch(`${this.url}/owner/${ownerId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
      });
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }
}

export const portfolioAPI = new PortfolioAPI(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`);