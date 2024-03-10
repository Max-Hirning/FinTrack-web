export interface IUserResponse {
	id: string;
	email: string;
	cards: string[];
	lastName: string;
	currency: string;
	firstName: string;
	avatar: string|null;
}

export interface IUserSession extends IUserResponse {
  jwt: string;
}