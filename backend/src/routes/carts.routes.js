import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
//import { authorization, passportError } from "../utils/messageErrors.js";
const routerCart = Router();

routerCart.get("/", cartsController.getCarts);
routerCart.get("/:cid", cartsController.getCart);
routerCart.post("/", cartsController.postCart);
routerCart.post("/:cid/purchase", cartsController.purchaseCart);
routerCart.put("/:cid/product/:pid", cartsController.putProductToCart);
routerCart.put("/:cid/products/:pid", cartsController.putQuantity);
routerCart.put( "/:cid",cartsController.putProductsToCart);
routerCart.delete( "/:cid",cartsController.deleteCart);
routerCart.delete("/:cid/products/:pid",cartsController.deleteProductFromCart);

export default routerCart;
