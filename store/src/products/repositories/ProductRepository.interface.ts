import { Product } from '../entities/product.entity';

export interface ProductRepository {
  save(product: Product): Promise<Product>;

  getAll(): Promise<Product[]>;

  getById(id: string): Promise<Product>;

  update(id: string, data: Partial<Product>): Promise<Product>;

  delete(id: string): Promise<void>;
}
