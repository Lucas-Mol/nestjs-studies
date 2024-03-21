import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductTypeOrmRepository } from './repositories/ProductTypeOrm.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductTypeOrmRepository) {}

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.getById(id);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return await this.productRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return await this.productRepository.delete(id);
  }
}
