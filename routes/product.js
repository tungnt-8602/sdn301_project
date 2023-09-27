import express from 'express'

const productRouter = express.Router()

// Activities -> User object
productRouter.get('/', (req, res)=>{
    res.send("Get all products")
})

productRouter.get('/:id', async(req, res)=>{
    res.send("Get product by Id")
})

productRouter.post('/create', async(req, res)=>{
    res.send("Create a new Product")
})

export default productRouter