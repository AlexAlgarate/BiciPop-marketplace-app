type SearchParamValue = string | string[] | undefined;

export type AdsPageSearchParams = Promise<Record<string, SearchParamValue>>;

export type AdsSearchParams = {
  query: string;
  order: 'asc' | 'desc';
  page: number;
};

const getSingleSearchParam = (value: SearchParamValue): string | undefined => {
  if (Array.isArray(value)) return value[0];
  return value;
};

export const parseAdsSearchParams = (
  searchParams: Record<string, SearchParamValue>,
): AdsSearchParams => {
  return {
    query: getSingleSearchParam(searchParams.query) as string,
    order: getSingleSearchParam(searchParams.order) as 'asc' | 'desc',
    page: Number(getSingleSearchParam(searchParams.page)) || 1,
  };
};
