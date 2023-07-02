import express, { Router } from "express";
import { productManager1 } from "../app.js";

import { Product } from "../.././src/models/products.js";
import { validateRequestBody, validatePut } from "./middleware_Products.js";

const app = express();
const routerProducts = Router();
app.use(express.json());

routerProducts.get("/", async (req, res) => {
  try {
    
    let products = await productManager1.getProducts();
    if (products == undefined) {
      throw new Error("Ese id no fue encontrado");
    }
    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      if (limit && limit > 0) {
        products = products.slice(0, limit);
      } else throw new Error("Limit not valid");
    } else {
      res.send(products);
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ status: "error", message: `${error}` });
  }
});

routerProducts.get("/:pid", async (req, res) => {
  try {
    const id = Number(req.params.pid);
    if (id < 0) {
      throw new Error("Id not valid");
    }
    let product = await productManager1.getProductById(id);
    if (product == undefined) {
      throw new Error("Ese id no fue encontrado");
    }

    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(404).json({ status: "error", message: "Product not found" });
  }
});

routerProducts.post("/", validateRequestBody, async (req, res) => {
  try {
    const { title, description, price, thumbnail, stock, codeP, category } =
      req.body;

    const product = new Product(
      title,
      description,
      price,
      thumbnail,
      stock,
      codeP,
      category
    );

    productManager1.addProducts(product);
    res.send(productManager1.getProducts());
  } catch (error) {
    console.error(error);
    res.status(404).json({ status: "error", message: "product not uploaded" });
  }
});

routerProducts.put("/", validatePut, async (req, res) => {
  const id = parseInt(req.query.id);
  const myVar = req.query.myVar;
  let value = req.query.value;
  if (id && value && myVar) {
    
    switch (value) {
      case value === "true" || value === "false":
        value = Boolean(value);
        break;
      case !isNaN(value):
        value = parseFloat(value);
        break;

      default:
        break;
    }

    if (!productManager1.getProductById(id)) {
      res.status(400).json({ status: "error", message: "Object no found" });
    } else {
      console.log("Funca " + id + " " + value + " " + myVar);

      productManager1.updateProduct(id, myVar, value);
      res.status(200).json({ status: "success", message: "Product upload" });
    }
  } else res.status(400).json({ status: "error", message: "Data no valid" });
});

routerProducts.delete("/", (req, res) => {
  const deleteId = parseInt(req.query.delete);
  if (deleteId) {
    productManager1.delete(deleteId);
    res.send({ status: "success", message: "Eliminado" });
  }
});

export default routerProducts;
