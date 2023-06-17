const fs = require("fs");
const { get } = require("http");

const filename = "Products.txt";
const filenameCount = "countId.txt";

class ProductManager {
  constructor() {
    this.products = [];
    this.countId = 0;
    if (!(fs.existsSync(filename) && fs.existsSync(filenameCount)))
      fs.writeFileSync(filename, JSON.stringify(this.products));
    fs.writeFileSync(filenameCount, JSON.stringify(this.countId));
  }
  saveCount(count) {
    //guarda la variable countId
    fs.writeFileSync(filenameCount, JSON.stringify(count) + "\n");
  }
  saveProducts(listProducts) {
    // guarda la el array de products en el archivo
    fs.writeFileSync(filename, JSON.stringify(listProducts) + "\n");
  }
  getCountId() {
    // trae el contador de id
    let ultimoId = fs.readFileSync(filenameCount, "utf-8");

    return JSON.parse(ultimoId);
  }
  getProducts() {
    //devuelve el array del archivo
    let listProducts = fs.readFileSync(filename, "utf-8");
    return JSON.parse(listProducts).map((data) => {
      const product = new Product();
      Object.assign(product, data);
      return product; // tuve que aprender de que si traigo los objetos este viene como obj JSON y nno como un objeto del tipo Product
    });
  }
  addProducts(product) {
    //add un producto
    if (fs.existsSync(filename)) {
      let listProducts = this.getProducts();
      if (!listProducts.some((e) => e.codeP === product.codeP)) {
        product.setIdProduct(this.idProduct());
        listProducts.push(product);

        this.saveProducts(listProducts);
      } else console.log(`Este producto no se pudo agregar: ${product.title}`);
    }
  }
  getProductById(num) {
    const listProducts = this.getProducts();
    return listProducts.find((e) => e.getIdProduct() === num);
  }
  idProduct() {
    // esta funcion se encargade generar un nuevo Id guardar el contador y luego retornar el valor
    if (fs.existsSync(filenameCount)) {
      this.saveCount(this.getCountId() + 1);
      return this.getCountId();
    }
  }
  updateProduct(id, myVar, value) {
    //modifica un obj del array
    const obj = this.getProductById(id);
    if (obj) {
      const lasVariables = Object.keys(obj);

      if (lasVariables.includes(myVar)) {
        obj[myVar] = value;
        console.log(`El objeto modificado es ${obj.title}`);
        obj.showAttributes();
        const listProducts = this.getProducts()
        listProducts[listProducts.findIndex(e =>e._idProduct === id)] = obj
        this.saveProducts(listProducts)
      } else {
        console.log("No se encontro la variable " + myVar);
      }
    } else {
      console.log("No se encontro ningun producto con " + id);
    }
  }
  delete(id) {
    // elimina un objeto pero creando una lista que lo excluye
    const listaNueva = this.getProducts().filter(
      (obj) => obj.getIdProduct() !== id
    );
    this.saveProducts(listaNueva);
    console.log('Esta es la nueva lista:\n');
    console.log(this.getProducts())
  }

  deleteFile() {
    //elimina los archivos
    fs.unlinkSync(filename);

    fs.unlinkSync(filenameCount);
  }
}

class Product {
  static code = 0;

  constructor(title, description, price, thumbnail, stock) {
    this._idProduct = null;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    Product.setCode();
    this.codeP = Product.getCode();
    this.stock = stock;
  }
  static getCode() {
    return Product.code;
  }
  static setCode() {
    Product.code++;
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

// SENTENCIAS

const product = new Product(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  25
);

const product2 = new Product(
  "producto prueba2",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  25
);

const pm1 = new ProductManager();
console.log(pm1.getProducts());
pm1.addProducts(product);
console.log(pm1.getProducts());
pm1.addProducts(product2);
console.log(pm1.getProducts());
pm1.updateProduct(1, "title", "nuevo nombre");
pm1.updateProduct(2, "descripasdasd", "nueva descripcion");

pm1.delete(2);

pm1.deleteFile();



