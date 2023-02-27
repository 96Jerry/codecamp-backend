import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateStarbucksModule } from './createStarbucks/createStarbucks.module';
import { CreateStarbucks } from './createStarbucks/entities/createStarbucks.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dlawns170633!',
      database: 'myproject03',
      entities: [CreateStarbucks],
      synchronize: true,
      logging: true,
    }),
    CreateStarbucksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
  ],
})
export class AppModule {}
