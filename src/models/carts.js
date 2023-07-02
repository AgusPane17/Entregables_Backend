import * as fs from "node:fs";
import { Product } from "./products.js";

const filenameCount = "../data/CountIdCart.txt";

class CartsProducts {
  static cartIdFirst = 0;

  constructor() {
    this.cartList = [];
    this.idCart = CartsProducts.getCountId();
    this._filename = `../data/Cart_${this.idCart}.txt`;

    if (!(fs.existsSync(this._filename) && fs.existsSync(filenameCount))) {
      fs.writeFileSync(filenameCount, JSON.stringify(this.idCart));
      fs.writeFileSync(this._filename, JSON.stringify(this.cartList));
    }
  }

  static getCartList(direction) {
    let products = fs.readFileSync(direction, "utf-8");
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
    return products;
  }

 

  static getCountId() {
    if (fs.existsSync(filenameCount)) {
      let idCart = fs.readFileSync(filenameCount, "utf-8");
      console.log(idCart)
      fs.writeFileSync(filenameCount, JSON.stringify(JSON.parse(idCart) + 1
      ))

      return JSON.parse(idCart) + 1;
    }
    fs.writeFileSync(filenameCount, JSON.stringify(CartsProducts.cartIdFirst+1))
    return CartsProducts.cartIdFirst;
  }


  static getCartById(id) {
    return fs.readFileSync(fs.readFileSync(`../data/Cart_${id}.txt`, "utf-8"))
  }
  static setCartById(id,cart){
    fs.writeFileSync(`../data/Cart_${id}.txt`, JSON.stringify(CartsProducts.cartIdFirst+1))
  }

  static addCart(idProduct,id) {

    let cartSelect = CartsProducts.getCartById(id)

   cartSelect.push({ "idProduct":idProduct, "cantP":1});
   setCartById(id,cartSelect)
  }


}
export default CartsProducts