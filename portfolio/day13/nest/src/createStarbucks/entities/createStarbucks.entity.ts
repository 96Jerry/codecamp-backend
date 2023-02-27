import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CreateStarbucks {
  @PrimaryGeneratedColumn('increment')
  number: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  kcal: number;

  @Column()
  fat: number;

  @Column()
  protein: number;

  @Column()
  natrium: number;

  @Column()
  sugar: number;

  @Column()
  caffeine: number;
}
