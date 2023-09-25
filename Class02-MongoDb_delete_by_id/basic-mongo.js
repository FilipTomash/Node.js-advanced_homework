import "dotenv/config";

import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

const client = new MongoClient(MONGO_URI);

const run = async () => {
  try {
    await client.db().command({ ping: 1 });

    console.log("connected to mongodb");

    const database = client.db();

    const products = database.collection("products");

    const productsCursor = products.find({});

    const data = await productsCursor.toArray();

    console.log("All products", data);

    const product = await products.findOne({
      _id: new ObjectId("642c797f703024bbeca596f1"),
    });

    console.log("Product result", product);
  } catch (error) {
    console.log(error);
  }
};

run();
