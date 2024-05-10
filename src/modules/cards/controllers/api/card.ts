import {IResponse} from "@/types/api";
import {ICardForm} from "@/modules/store";
import {ICardsFilters, ICardsListResponse} from "../../types/card";

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
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }

  async getAll({ownerId}: Pick<ICardsFilters, "ownerId">, token: string): Promise<IResponse<ICardsListResponse>> {
    try {
      if(!(ownerId && token)) throw ("No cards were found");
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
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
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
      const result = await response.json();
      if(!response.ok) throw (result);
      return result;
    } catch (error) {
      throw (error as string);
    }
  }
}

export const cardAPI = new CardAPI(`${process.env.NEXT_PUBLIC_API_URL}/card`);