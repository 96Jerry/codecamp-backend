import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Allergy {
  @PrimaryGeneratedColumn('uuid')
  allergyId: string;

  @Column()
  name: string;

  @JoinColumn()
  @ManyToMany(() => Product[], (products) => products.allergies)
  products: Product[]
}
