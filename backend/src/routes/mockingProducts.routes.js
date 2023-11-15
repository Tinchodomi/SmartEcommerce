import { Router } from "express";
import generateRandomProducts from "../utils/mockingProducts.js";
import loggers from "../utils/loggers.js";

const routerMockingProducts = Router();

routerMockingProducts.get("/", (req, res) => {
    loggers.http('GET /mockingProducts');
    const products = generateRandomProducts(100);
    res.json(products);
});

export default routerMockingProducts;