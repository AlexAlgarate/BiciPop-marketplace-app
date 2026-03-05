export interface AdDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  userId: string;
  categoryId: number;
  location: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  userName: string;
}

export interface AdsResultDto {
  items: AdDTO[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface CreateAdDTO {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  location: string;
  userId: string;
}
