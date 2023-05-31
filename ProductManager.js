class ProductManager {
  static countId = 0;

  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }
  getProductById(num) {
    return this.products.find((e) => e.idProduct === num);
  }


  addProducts(product) {
    console.log(this.products.some((e) => e.codeP === product.codeP));

    if (!this.products.some((e) => e.codeP === product.codeP)) {
      this.products.push(product);
      product.idProduct = ProductManager.countId;
      ProductManager.countId++;
      console.log(ProductManager.countId);
    } else console.log(`Este producto no se pudo agregar: ${product.title}`);
  }
}

class Product {
  static code = 0;
  idProduct
  constructor(title, description, price, thumbnail, stock) {
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
  showAttributes() {
    console.log("*----------------------------------------------*");
    Object.keys(this).forEach((attribute) => {
      console.log(`${attribute}: ${this[attribute]}`);
    });
    console.log("*----------------------------------------------*");
  }
}

const naranja = new Product(
  "naranja",
  "fruta naranja redonda",
  22.05,
  "url",
  3
);
const manzana = new Product("manzana", "fruta roja redonda", 20.0, "url", 7);
const pm1 = new ProductManager();

pm1.addProducts(manzana);
pm1.addProducts(naranja);
pm1.addProducts(manzana);

const unArreglo = pm1.getProducts();

console.log("----------------------");
console.log(unArreglo);
console.log("----------------------");

buscarId = pm1.getProductById(1);

console.log(buscarId);
