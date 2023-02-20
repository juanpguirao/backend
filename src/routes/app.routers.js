import express from 'express';
// import sessionsRouter from './sessions/sessions.routes.js';
import viewsRouter from './views/views.router.js'
import usersRouter from './users/user.routes.js'
import productRouter from './products/product.router.js'
import cartsRouter from './carts/carts.routes.js';
import __dirname from "../utils.js";

const router = express();



router.use('/', viewsRouter)
router.use('/api/users', usersRouter)
router.use('/api/product', productRouter)
router.use('/api/carts/', cartsRouter)

export default router;
