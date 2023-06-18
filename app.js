import {PM} from './ProductManager.js' 
import express from 'express'

const app = express()
app.use = (express.json())
const post = 8080


app.get('/products/', async (req,res)=>{
    let productList = await PM()
  res.send(productList);

})


app.get('/products/:limit', async (req,res)=>{
    let productList = await PM()
    const limit = parseInt(req.query.limit)
    if(Object.keys(req.query).length > 1){
        return res.status(400).send('Se ha excedido el límite de parámetros de consulta.')
    }

    console.log('LIMIT')
    

  if (limit < productList.length) {
    let newProducts = productList.slice(0, limit);
    return res.send(newProducts)
  }

  res.send(productList);

})

app.get('/products/pid/:id',async (req,res)=>{
    let productList = await PM()
    const id = parseInt(req.params.id)
    console.log('ID')
    let product = productList.find(e => e.getIdProduct() === id)
    res.send(product)
})

app.listen(post,()=>console.log(`Server is running at ${post}`))