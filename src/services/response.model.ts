import { Product } from '../models/post.model';

export interface Response {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}
