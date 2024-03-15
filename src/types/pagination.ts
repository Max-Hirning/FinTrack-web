export interface IPagination<T> {
  data: T;
  page: null|number;
  next: null|number;
  previous: null|number;
  totalPages: null|number;
}