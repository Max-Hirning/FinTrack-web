import {IResponse} from "@/types/api";
import {ICardForm} from "../types/cardForm";
import {ICardsResponse} from "../types/card";

class CardAPI {
  constructor(protected readonly url: string) {}

  async getAll(cards: string[], token: string): Promise<IResponse<ICardsResponse[]>> {
    try {
      if (!(cards && token)) throw new Error("No cards were found");
      const queryParams = new URLSearchParams({
        cards: JSON.stringify(cards),
      });
      const response = await fetch(`${this.url}?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async create(data: ICardForm, ownerId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await fetch(this.url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({...data, ownerId}),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export const cardAPI = new CardAPI(`${process.env.NEXT_PUBLIC_URL}/card`);