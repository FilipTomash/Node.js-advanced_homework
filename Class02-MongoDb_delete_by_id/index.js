import "dotenv/config";
import express from "express";
import { ObjectId } from "mongodb";
import { getDb, connectedToDatabase } from "./db/mongo-connections.js";

const app = express();

app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const db = getDb();

    const productsCollection = db.collection("products");

    const productsCursor = productsCollection.find({});

    const productsData = await productsCursor.toArray();

    res.status(200).send(productsData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const db = getDb();

    const productsCollection = db.collection("products");

    const product = await productsCollection.findOne({ _id: new ObjectId(id) });

    if (!product) throw new Error("product not found");

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const productData = req.body;

    const db = getDb();

    const productsCollection = db.collection("products");

    const response = await productsCollection.insertOne(productData);

    console.log("inserOne response", response);

    res.status(201).send({
      msg: `Product with ${response.insertedId} was added`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productUpdates = req.body;

    const db = getDb();
    const productsCollection = db.collection("products");

    const response = await productsCollection.findOneAndReplace(
      { _id: new ObjectId(productId) },
      productUpdates,
      {
        returnDocument: "after",
      }
    );
    console.log("replace response", response);
    console.log(response.value);

    res.json(response.value);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
  }
});

app.patch("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productUpdates = req.body;

    const db = getDb();
    const productCollections = db.collection("products");

    const response = await productCollections.findOneAndUpdate(
      {
        _id: new ObjectId(productId),
      },
      {
        $set: productUpdates,
      },
      {
        returnDocument: "after",
      }
    );

    console.log("Update response", response);
    console.log(response.value);

    res.send(response.value);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

app.listen(3000, () => {
  connectedToDatabase();
  console.log("Server is up at port 3000");
});
