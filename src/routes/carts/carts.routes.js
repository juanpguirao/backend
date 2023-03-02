import { Router } from 'express';
import CartManager from '../../dao/fileSystem/cart.manager.js';
import options from "../../config/options.js"
const router = Router()

const cartManager = new CartManager(options.fileSystem.cartFileName)

router.get('/:cid',async (req, res) =>{
    const id = Number(req.params.cid)
    const cart = await cartManager.getCartById(id) 
    if(cart.error){
        res.status(400).send({
            error: cart.error
        })
    }
    res.send({
        status: 'success',
        products: cart.products
    })
})

router.post('/:cid/product/:pid', async(req,res)=>{
    const cartId = Number(req.params.cid)
    const productId = Number(req.params.pid)
    const addProduct = await cartManager.addProduct(cartId, productId)
    if(addProduct.error){
        return res.status(400).send({
            error: addProduct.error
        })
    }
    res.send({
        status: 'success',
        newCart: addProduct
    })
})

router.post('/', async(req, res)=>{
    const addCart = await cartManager.addCart()
    res.send({
        status: 'success',
        cart: addCart
    })
})

export default router;