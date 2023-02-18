import { Router } from 'express';
// import sessionsRouter from './sessions/sessions.routes.js';
import usersRouter from '../users.routes.js'
// import viewsRouter from '../views.router.js'
// import productRouter from '../product.router.js'
// import cartsRoutes from './routes/carts.routes.js';
const router = Router();

// Api Routes
// router.use('/sessions', sessionsRouter);
router.use('/api/users', usersRouter)
// router.use('/api/viewsRouter', viewsRouter)
// router.use('/api/product', productRouter)
// app.use('/api/carts/', cartsRoutes)
// app.use('/api/pets', petsRoutes);
export default router;