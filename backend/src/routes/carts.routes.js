import { Router } from "express";
import { getCartById, getCarts, postProductInCart, postEmptyCart, deleteProductInCart, putCart, putProductInCart } from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.get("/", getCarts)
cartRouter.get("/:id", getCartById);
cartRouter.post("/", postEmptyCart);//crear nuevo carrito vacio
cartRouter.post("/:cid/products/:pid", postProductInCart);
cartRouter.delete("/:cid/products/:pid", deleteProductInCart);
cartRouter.put("/:cid", putCart);
cartRouter.put("/:cid/products/:pid", putProductInCart);





export default cartRouter;
