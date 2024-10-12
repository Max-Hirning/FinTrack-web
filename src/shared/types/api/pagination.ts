interface IPaginationResponse<T> {
  data: T[];
  prevPage: number;
  nextPage: number;
  totalPages: number;
}

export type {
  IPaginationResponse
}