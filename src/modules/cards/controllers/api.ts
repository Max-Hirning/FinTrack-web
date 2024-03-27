import {IResponse} from "@/types/api";
import {ICardForm} from "@/modules/store";
import {ICardsFilters, ICardsListResponse} from "../types/card";

class CardAPI {
  constructor(protected readonly url: string) {}

  async delete(cardId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/${cardId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "DELETE",
      });
      if(!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getAll({cards}: ICardsFilters, token: string): Promise<IResponse<ICardsListResponse>> {
    try {
      if(!(cards && token)) throw new Error("No cards were found");
      const filters: { ownerId?: string, cards?: string } = {};
      if(cards) filters.cards = JSON.stringify(cards);
      const queryParams = new URLSearchParams(filters as Record<string, string>);
      const response = await fetch(`${this.url}?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "GET",
      });
      if(!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async update(data: Omit<ICardForm, "_id">, cardId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(`${this.url}/${cardId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "PUT",
        body: JSON.stringify(data),
      });
      if(!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async create(data: Omit<ICardForm, "_id">, ownerId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(this.url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify({...data, ownerId}),
      });
      if(!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export const cardAPI = new CardAPI(`${process.env.NEXT_PUBLIC_API_URL}/card`);