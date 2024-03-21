import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductAttribute } from './product-attribute.entity';
import { ProductImage } from './product-image.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'despription', length: 255, nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  category: string;

  @OneToMany(
    () => ProductAttribute,
    (productAttribute) => productAttribute.product,
    { cascade: true, eager: true },
  )
  attributes: ProductAttribute[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImage[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
