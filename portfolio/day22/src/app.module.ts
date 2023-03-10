import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './apis/products/product.module';
import { ProductSubCategoryModule } from './apis/productSubCategory/productSubCategory.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProductMainCategoryModule } from './apis/productsMainCategory/productMainCategory.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/commons/graphql/schema.graphql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'dlawns170633!',
      database: 'myproject04',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
    }),
    ProductModule,
    ProductSubCategoryModule,
    ProductMainCategoryModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
