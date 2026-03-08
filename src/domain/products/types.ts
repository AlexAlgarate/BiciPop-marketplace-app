export interface ProductDTO {
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

export type ProductWithRelations = {
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
  category: { name: string };
  user: { username: string };
};
