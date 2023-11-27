import { Router } from "express";
import { deleteProduct, getProduct, getProducts, postProduct ,putProduct } from "../controllers/product.controller.js";
import {passportError, authorization} from '../utils/messageErrors.js'

//Error handling
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/Eerrors.js";
import { generateProductErrorInfo } from "../errors/info.js";


const productRouter = Router()

productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)
productRouter.post('/', (req, res, next) => {
    
    const { title, description, price, stock, code, category } = req.body;
    try {
        if (!title || !description || !price || !stock || !code || !category) {
            CustomError.createError({
                name: "Product creation error",
                cause: generateProductErrorInfo({ title, description, price, stock, code, category }),
                message: "One or more properties were incomplete or not valid.",
                code: EErrors.INVALID_PRODUCT_ERROR
            })
        }
        next();
    } catch (error) {
        next(error);
    }
}, passportError('jwt'), authorization(['admin']), postProduct);
productRouter.put('/:id',passportError('jwt'), authorization('admin'), putProduct)
productRouter.delete('/:id',passportError('jwt'), authorization('admin'), deleteProduct)


export default productRouter