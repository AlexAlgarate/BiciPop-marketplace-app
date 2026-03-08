export type SearchParamValue = string | string[] | undefined;

export type AdsPageSearchParams = Promise<Record<string, SearchParamValue>>;

export type AdsSearchParams = {
  query: string;
  order: 'asc' | 'desc';
  page: number;
  category: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
};
