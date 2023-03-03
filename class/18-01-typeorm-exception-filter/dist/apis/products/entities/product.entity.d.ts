import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/users.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    isSoldout: boolean;
    productSaleslocation: ProductSaleslocation;
    productCategory: ProductCategory;
    user: User;
    productTags: ProductTag[];
}
