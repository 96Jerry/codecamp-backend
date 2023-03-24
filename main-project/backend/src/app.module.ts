import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './apis/products/product.module';
import { ProductSubCategoryModule } from './apis/productSubCategory/productSubCategory.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProductMainCategoryModule } from './apis/productsMainCategory/productMainCategory.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PaymentModule } from './apis/payment/payment.module';
import { FileMoudle } from './apis/file/file.module';
import { ImageModule } from './apis/images/image.module';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/commons/graphql/schema.graphql',
      context: ({ req, res }) => ({ req, res }), // gql 로 들어온 req, res를 뒤의 api에서 사용해주겠다.
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydocker04', //
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      // logging: true,
    }),
    ProductModule,
    ImageModule,
    FileMoudle,
    PaymentModule,
    ProductSubCategoryModule,
    ProductMainCategoryModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
