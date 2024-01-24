import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.mrw9qa2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
});
var db;

async function connect(){
    await client.connect();
    db = client.db('mymamcet');
    console.log("Connected to MongoDB ✨");
}

export {connect, db}