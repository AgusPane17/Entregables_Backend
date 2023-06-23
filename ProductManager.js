import * as fs from 'node:fs'

const filename = "Products.txt";
const filenameCount = "countId.txt";

export class ProductManager {
  constructor() {
    this.products = [];
    this.countId = 0;

    
    
    if (!(fs.existsSync(filename) && fs.existsSync(filenameCount))){
      
      fs.writeFileSync(filename, JSON.stringify(this.products));
      fs.writeFileSync(filenameCount, JSON.stringify(this.countId));
    }
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

  addProducts(product) {//añade un producto a el administrador de productos   
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

  getProductById(num) { // trae un producto por su ID de el administrador de productos
    const listProducts = this.getProducts();
    return listProducts.find((e) => e.getIdProduct() === num);
  }

  idProduct() {// asigna un id unico a el producto al ser ingresado a el listado
    // esta funcion se encargade generar un nuevo Id guardar el contador y luego retornar el valor
    if (fs.existsSync(filenameCount)) {
      this.saveCount(this.getCountId() + 1);
      return this.getCountId();
    }
  }

  updateProduct(id, myVar, value) {// busca cambiar el valor de una variable 
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

  delete(id) { //Elimina el producto en base al ID proporcionado
    // elimina un objeto pero creando una lista que lo excluye
    const listaNueva = this.getProducts().filter(
      (obj) => obj.getIdProduct() !== id
    );
    this.saveProducts(listaNueva);
    console.log('Esta es la nueva lista:\n');
    console.log(this.getProducts())
  }

  deleteFile() { //Elimina los archivos hechos por el programa
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
const product1 = new Product('producto1','decripcion producto 1',500,'no img',10)
const product2 = new Product('producto2','decripcion producto 2',45,'no img',5)
const product3 = new Product('producto3','decripcion producto 3',100,'no img',15)

const pm1 = new ProductManager();
console.log(pm1.getProducts());
// pm1.addProducts(product1);
// console.log(pm1.getProducts());
// pm1.addProducts(product2);
// pm1.addProducts(product3);

// console.log(pm1.getProducts());
// pm1.updateProduct(1, "title", "nuevo nombre");
// pm1.updateProduct(2, "descripasdasd", "nueva descripcion");

// pm1.delete(2);

// pm1.deleteFile();

