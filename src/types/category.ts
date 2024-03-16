export interface ICategory {
  _id: string;
  title: string;
  color: string;
  image: string;
  children: ICategory[];
}