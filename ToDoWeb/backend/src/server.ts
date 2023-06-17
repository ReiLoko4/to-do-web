import * as mongoDB from 'mongodb';
import { config } from './config/config';

export const collections: { tasks?: mongoDB.Collection } = {}
export async function connectToDatabase () {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.mongo.url, { retryWrites: true, w: 'majority'});
    await client.connect();

    const db: mongoDB.Db = client.db(config.mongo.name);
    const tasksCollection: mongoDB.Collection = db.collection(config.collection.collection_name);

    collections.tasks = tasksCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${tasksCollection.collectionName}`);
}
