import { AdDTO } from '@/domain/ads/types';

export interface AdsResultDto {
  items: AdDTO[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
