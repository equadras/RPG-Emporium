import { api } from './api';

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

// retorna lista “plana”
export async function fetchProducts(): Promise<ProductDTO[]> {
  const resp = await api.get<ProductDTO[]>('/products');
  return resp.data;
}
