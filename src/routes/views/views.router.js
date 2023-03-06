import { Router } from 'express';
import uploader from '../../utils.js';
// import {auth} from '../middlewares/auth.middleware.js';
// import {sessionMiddleware} from '../middlewares/session.middleware.js';
import ProductManager from '../../dao/fileSystem/product.manager.js';
import options from '../../config/options.js';

const router = Router();
const productManager = new ProductManager(options.fileSystem.productFileName)

router.get('/', async (req, res)=>{
  const products = await productManager.getProducts()
  const limit = req.query.limit
  if(!limit){
      return res.render('home',{
          products: products,
          style: 'index.css',
          title: 'Products'
      })
  }
  const limitedProducts = products.slice(0,limit)
  res.render('home',{
      products: limitedProducts,
      style: 'home.css',
      title: 'Products'
  })
})

router.get('/realtimeproducts', async (req, res)=>{
  const products = await productManager.getProducts()
  const limit = req.query.limit
  if(!limit){
      return res.render('realTimeProducts',{
          products: products,
          style: 'home.css',
          title: 'Real Time Products'
      })
  }
  const limitedProducts = products.slice(0,limit)
  res.render('realTimeProducts',{
      products: limitedProducts,
      style: 'home.css',
      title: 'Real Time Products'
  })
})

// router.post('/realtimeproducts', uploader.array('files'), async (req, res)=>{
//   const newProduct = req.body
//   const socket = req.app.get('socket')
//   if(!newProduct){
//       return res.status(400).send({
//           error: 'missing product'
//       })
//   }
//   if(req.files){
//       const paths = req.files.map(file => {
//           return {path: file.path,
//            originalName: file.originalname    
//           }
//       })
//       newProduct.thumbnails = paths
//   }
//   socket.emit('newProduct', newProduct)
//   res.send({
//       status: 'success'
//   })
// })
export default router;