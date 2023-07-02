import * as fs from "node:fs";

const filename = "../data/ProductManager.txt";
const filenameCount = "../data/CountId.txt";

class ProductManager {
  constructor() {
    this.products = [];
    this.countId = 0;
    if (!(fs.existsSync(filename) && fs.existsSync(filenameCount))) {
      fs.writeFileSync(filename, JSON.stringify(this.products));
      fs.writeFileSync(filenameCount, JSON.stringify(this.countId));
    }
  }

  saveCount(count) {
    //guarda la variable countId
    fs.writeFileSync(filenameCount, JSON.stringify(count) + "\n");
  }

  saveProducts(product) {
    // guarda la el array de products en el archivo
    this.products.push(product);
    fs.writeFileSync(filename, JSON.stringify(this.products) + "\n");
  }

  getCountId() {
    // trae el contador de id
    let ultimoId = fs.readFileSync(filenameCount, "utf-8");

    return JSON.parse(ultimoId);
  }

  getProducts() {
    let products = fs.readFileSync(filename, "utf-8");
    products = JSON.parse(products).map((data) => {
      const product = new Product(
        data.title,
        data.description,
        data.price,
        data.thumbnail,
        data.stock,
        data.codeP,
        data.category
      );
      product.setIdProduct(data._idProduct);
      return product;
    });
    return products
  } 

  addProducts(product) {
    //añade un producto a el administrador de productos
    //add un producto
    if (fs.existsSync(filename)) {
      this.products = this.getProducts();
      if (!this.products.some((e) => e.codeP === product.codeP)) {
        product.setIdProduct(this.idProduct());
        this.saveProducts(product);
      } else console.log(`Este producto no se pudo agregar: ${product.title}`);
    }
  }

  getProductById(num) {
    // trae un producto por su ID de el administrador de productos
    console.log(this.getProducts().find((e) => e.getIdProduct() == num))
    return this.getProducts().find((e) => e.getIdProduct() == num);
  }

  idProduct() {
    // asigna un id unico a el producto al ser ingresado a el listado
    // esta funcion se encargade generar un nuevo Id guardar el contador y luego retornar el valor
    if (fs.existsSync(filenameCount)) {
      this.saveCount(this.getCountId() + 1);
      return this.getCountId();
    }
  }

  updateProduct(id, myVar, value) {
    const obj = this.getProductById(id);
    if (obj) {
      if (Object.hasOwnProperty.call(obj, myVar)) {
        obj[myVar] = value;
        console.log(`El objeto modificado es ${obj.title}`);
        obj.showAttributes(); // guarda el array completo de productos actualizado
      this.saveProducts(obj)
      
      } else {
        console.log("No se encontró la variable " + myVar);
      }
    } else {
      console.log("No se encontró ningún producto con ID: " + id);
    }
  }

  delete(id) {
    //Elimina el producto en base al ID proporcionado
    // elimina un objeto pero creando una lista que lo excluye
    products = this.getProducts().filter(
      (obj) => obj.getIdProduct() !== id
    );
    this.saveProducts(products);
    console.log("Esta es la nueva lista:\n");
    console.log(this.getProducts());
  }

  deleteFile() {
    //Elimina los archivos hechos por el programa
    //elimina los archivos
    fs.unlinkSync(filename);

    fs.unlinkSync(filenameCount);
  }
}

class Product {
  constructor(title, description, price, thumbnail, stock, codeP, category) {
    this._idProduct = null;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.codeP = codeP;
    this.status = true;
    this.category = category;
    this._quantity = null
  }

  setQuantity(quantity){
    this._quantity = quantity
  }

  getIdProduct() {
    return this._idProduct;
  }

  setIdProduct(id) {
    this._idProduct = id;
  }

  showAttributes() {
    console.log("*----------------------------------------------*");
    Object.keys(this).forEach((attribute) => {
      console.log(`${attribute}: ${this[attribute]}`);
    });
    console.log("*----------------------------------------------*");
  }
}

export { Product, ProductManager };
