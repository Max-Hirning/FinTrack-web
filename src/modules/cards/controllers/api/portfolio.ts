import {IResponse} from "@/types/api";
import {IPortfolioForm} from "@/modules/store";
import {IPortfoliosFilters, IPortfoliosListResponse} from "../../types/portfolio";

class PortfolioAPI {
  constructor(protected readonly url: string) {}

  async delete(portfolioId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/${portfolioId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "DELETE",
      });
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async update(data: Omit<IPortfolioForm, "_id">, portfolioId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/${portfolioId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "PUT",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async create(data: Omit<IPortfolioForm, "_id">, ownerId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(this.url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify({...data, ownerId}),
      });
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

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