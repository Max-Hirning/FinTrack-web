export interface IUserResponse {
	_id: string;
  email: string;
  lastName: string;
  currency: string;
  firstName: string;
  cardIds: string[];
  avatar: string | null;
}

export interface IUserSession extends Omit<IUserResponse, "cardIds"|"_id"> {
	id: string;
  jwt: string;
	cards: string[];
}