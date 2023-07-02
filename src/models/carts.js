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

    return products;
  }

  static getCountId() {
    if (fs.existsSync(filenameCount)) {
      let idCart = fs.readFileSync(filenameCount, "utf-8");
      console.log(idCart);
      fs.writeFileSync(filenameCount, JSON.stringify(JSON.parse(idCart) + 1));

      return JSON.parse(idCart) + 1;
    }
    fs.writeFileSync(
      filenameCount,
      JSON.stringify(CartsProducts.cartIdFirst + 1)
    );
    return CartsProducts.cartIdFirst;
  }

  static getCartById(id) {
    console.log(`../data/Cart_${id}.txt`);
    return JSON.parse(fs.readFileSync(`../data/Cart_${id}.txt`, "utf-8"));
  }

  static setCartById(id, cart) {
    fs.writeFileSync(`../data/Cart_${id}.txt`, JSON.stringify(cart));
  }

  static addCart(idProduct, id) {
    let cartSelect = CartsProducts.getCartById(id);
    console.log(cartSelect);

    if (
      cartSelect.some((e) => {
        return e.idProduct == idProduct;
      })
    ) {
      const obj = cartSelect.find((e) => {
       return e.idProduct == idProduct;
      });

      obj.quantity = obj.quantity + 1;
      CartsProducts.setCartById(id, cartSelect);

    } else {
      cartSelect.push({ idProduct: idProduct, quantity: 1 });
      CartsProducts.setCartById(id, cartSelect);
    }
  }
  delete() {}
}

export default CartsProducts;
