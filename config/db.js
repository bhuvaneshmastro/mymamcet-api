import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = `mongodb://localhost:27017`;
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
var db;

async function connect(){
    await client.connect();
    db = client.db('mymamcet');
    console.log("Connected to MongoDB ✨");
}

export {connect, db}