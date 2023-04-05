import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/boards/boards.module';
import { FileModule } from './apis/file/file.module';
import { PaymentMoudle } from './apis/payment/payment.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/users/user.module';

@Module({
  imports: [
    AuthModule,
    PointTransactionModule,
    PaymentMoudle,
    BoardModule,
    FileModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.58.96.4',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'myserver03',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
