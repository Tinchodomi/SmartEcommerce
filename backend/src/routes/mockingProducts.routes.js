import { Router } from "express";
import generateRandomProducts from "../utils/mockingProducts.js";
import loggers from "../utils/loggers.js";

const mockingproducts = Router();

mockingproducts.get("/", (req, res) => {
    loggers.http('GET /mockingproducts');
    const products = generateRandomProducts(100);
    res.json(products);
});


export default mockingproducts;