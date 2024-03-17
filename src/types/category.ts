export interface ICategoryResponse {
  _id: string;
  mcc: string[];
  title: string;
  color: string;
  image: string;
  children: ICategoryResponse[];
}