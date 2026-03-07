import { AdDTO } from '@/domain/ads/types';

export interface AdsFilter {
  query: string;
  order: 'asc' | 'desc';
  page: number;
  pageSize: number;
}

export interface AdsResultDto {
  items: AdDTO[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
