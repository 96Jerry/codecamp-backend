import { BigQuery } from '@google-cloud/bigquery';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(datasource: DataSource) {
    datasource.subscribers.push(this);
  }
  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    console.log(event);

    const bigQuery = new BigQuery({
      keyFilename: 'sociallogin-380212-45164b0b31bd.json',
      projectId: 'sociallogin-380212',
    });

    bigQuery
      .dataset('mybigquery03')
      .table('productlog')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);
  }
}
