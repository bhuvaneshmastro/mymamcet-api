import { MongoClient } from 'mongodb';

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
var db;

async function connect(){
    await client.connect();
    db = client.db('mymamcet');
    console.log("Connected to MongoDB ✨");
}

export {connect, db}