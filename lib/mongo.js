const { MongoClient } = require("mongodb");
const { config } = require("../config");
const debug = require("debug")("app:mongo");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const DB_HOST = config.dbHost;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`// prettier-ignore
//const MONGO_URI = "mongodb+srv://user:gYuoU0WVn8KvxnFY@cluster0-aazld.mongodb.net/test?retryWrites=true&w=majority";

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        this.dbName = DB_NAME;
    }

    connect() {
        return new Promise((resolve, reject)=>{
            this.client.connect(error =>{
                if(error){
                    reject(error);
                }
                console.log('Connected succesfully to mongo');
                resolve(this.client.db(this.dbName));
            });
        });
    }

    getAll(collection, query){
        return this.connect().then(db =>{
            return db
            .collection(collection)
            .find(query)
            .toArray();
        });
    }
}

module.exports = MongoLib;