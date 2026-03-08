export interface FilterProducts {
  query: string;
  order: 'asc' | 'desc';
  page: number;
  pageSize: number;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
}
