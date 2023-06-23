import { ProductManager } from "./ProductManager.js";
import express from "express";

const app = express();
app.use = express.json();
const post = 8080;

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
  try{
    
  
  let products = await productManager.getProducts();
  if ((products == undefined)) {
    throw new Error("Ese id no fue encontrado");
  }
  if (req.query.limit) {
    const limit = parseInt(req.query.limit);
    if (limit && limit > 0) {
      products = products.slice(0, limit);
    }else  throw new Error(" Limit not valid");
  }else{
    throw new Error(" Query not valid");
  }

  res.send(products);
  }
  catch(error){
    
    console.error(error);
    res.status(404).json({ status: "error", message: `${error}`});
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const id = Number(req.params.pid);
    if (id < 0) {
      throw new Error("Id not valid");
    }
    let product = await productManager.getProductById(id);
    if ((product == undefined)) {
      throw new Error("Ese id no fue encontrado");
    }

    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(404).json({ status: "error", message: "Product not found" });
  }
});



app.listen(post, () => console.log(`Server is running at ${post}`));
