import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './ProductRepository.interface';
import { Repository } from 'typeorm';

export class ProductTypeOrmRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async save(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getById(id: string): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, data);
    return await this.productRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
