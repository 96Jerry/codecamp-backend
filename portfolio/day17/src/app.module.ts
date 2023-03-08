import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './apis/products/product.module';
import { ProductSubCategoryModule } from './apis/productSubCategory/productSubCategory.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '../commons/graphql/schema.graphql',
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
  ],
})
export class AppModule {}
