
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
    if(productManager1.getProductById){

        CartsProducts.addCart(productId,cartId)
        res.status(200).json({})
    }

}



    catch{
        console.error()
    }

})


export default routerCarts
