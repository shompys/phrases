export interface Pagination<T> {
  data: T;
  itemsCount: number;
  currentPage: number;
  totalItems: number;
  prevPage: number | null;
  nextPage: number | null;
}
