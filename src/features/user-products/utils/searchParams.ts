type SearchParamValue = string | string[] | undefined;

export type AdsPageSearchParams = Promise<Record<string, SearchParamValue>>;

export type AdsSearchParams = {
  query: string;
  order: 'asc' | 'desc';
  page: number;
  category: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
};

const getSingleSearchParam = (value: SearchParamValue): string | undefined => {
  if (Array.isArray(value)) return value[0];
  return value;
};

export const parseAdsSearchParams = (
  searchParams: Record<string, SearchParamValue>,
): AdsSearchParams => {
  const rawMinPrice = Number(getSingleSearchParam(searchParams.minPrice));
  const rawMaxPrice = Number(getSingleSearchParam(searchParams.maxPrice));
  const rawCategory = Number(getSingleSearchParam(searchParams.category));

  return {
    query: getSingleSearchParam(searchParams.query) ?? '',
    order: (getSingleSearchParam(searchParams.order) as 'asc' | 'desc') ?? 'desc',
    page: Number(getSingleSearchParam(searchParams.page)) || 1,
    category: !isNaN(rawCategory) && rawCategory > 0 ? rawCategory : undefined,
    minPrice: !isNaN(rawMinPrice) && rawMinPrice > 0 ? rawMinPrice : undefined,
    maxPrice: !isNaN(rawMaxPrice) && rawMaxPrice > 0 ? rawMaxPrice : undefined,
  };
};
