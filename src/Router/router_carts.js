
import express, { Router } from "express";
import  CartsProducts  from "../models/carts.js";
import { productManager1 } from "../app.js";



const app = express();
const routerCarts = Router();
app.use(express.json());


routerCarts.get('/:cid',(req,res)=>{
    const id = parseInt(req.params.cid) 
    res.send(CartsProducts.getCartList(`../data/Cart_${id}.txt`))
})

routerCarts.post('/',(req,res)=>{
    const cart = new CartsProducts()
    // console.log(cart.idCart)
    console.log(cart.cartList)

    res.send (cart.cartList)
})

routerCarts.post('/:cid/product/:pid',(req,res)=>{

    try{
      const cartId = parseInt(req.params.cid)
      const productId = parseInt(req.params.pid)
      console.log(cartId)
      
      console.log(productId)

      console.log(productManager1.getProductById(productId))
      
      if(productManager1.getProductById(productId)){
        CartsProducts.addCart(productId,cartId)
        res.status(200).json({})
      } else {throw new Error("Product not found");} 
    }
    
    catch (Error){
      console.error()
      res.status(404).json({status: "error", message: `${Error}`})
    }
  })


export default routerCarts
