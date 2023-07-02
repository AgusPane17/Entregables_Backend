import express from "express";
import  routerProducts  from './Router/router_products.js';
import routerCarts from './Router/router_carts.js'
import {ProductManager} from './models/products.js'




const app = express();
app.use(express.json())
const post = 8080;

const productManager1 = new ProductManager();

//rutas de products
app.use('/api/products', routerProducts);
app.use('/api/carts',routerCarts)

export {productManager1}

//Iniciar server
app.listen(post, () => console.log(`Server is running at ${post}`));


