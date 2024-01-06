import { Router } from "express";
import cartRouter from "./carts.routes.js";
import productRouter from "./products.routes.js";
import sessionRouter from "./sessions.routes.js";
import userRouter from "./users.routes.js";
import ticketRouter from "./tickets.routes.js";
import mockingproducts from './mockingproducts.routes.js'

const router = Router()

router.use('/api/products', productRouter)
router.use('/api/users', userRouter)
router.use('/api/carts', cartRouter)
router.use('/api/sessions', sessionRouter)
router.use('/api/tickets', ticketRouter);
router.use('/api/mockingproducts', mockingproducts )



export default router