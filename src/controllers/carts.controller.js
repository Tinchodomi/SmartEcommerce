import cartModel from "../models/carts.model.js";



export const getCarts = async (req,res)=>{

    try {

        const getCarts = await cartModel.find().populate('products.id_prod');
        res.status(200).send(`Tus Carritos son: ${JSON.stringify(getCarts)}`);
      } catch (error) {
        res
          .status(400)
          .send({ error: `No se pudo obtener la collecion Carts${error}` });
      }


}

export const getCartById = async (req, res) =>{

    try {
        const { id } = req.params;
        const getCartById = await cartModel.findOne({_id: id});
        res.status(200).send({ mensaje: "Carrito encontrado", respuesta: getCartById })
      } catch (error) {
        res.status(400).send({ error: `No se pudo obtener Cart : ${error}` });
      }

}

export const postEmptyCart = async (req, res)=>{

    try {
        const crearCarrito = await cartModel.create({});
        res.status(200).send(`Carrito creado exitosamente ${crearCarrito}`);
      } catch (error) {
        res.status(400).send({ error: `No se pudo crear Cart : ${error}` });
}
}

export const postProductInCart = async (req,res)=>{
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await cartModel.findById(cid);
  
      if (cart) {
        cart.products.push({ id_prod: pid, quantity: quantity });
        const agregarProd = await cartModel.findByIdAndUpdate(cid, cart);
        res
          .status(200)
          .send(`Producto:${agregarProd} agregado al Carrito:${cart}`);
      }
    } catch (e) {
      res.status(400).send({ error: e });
    }

}

export const deleteProductInCart = async (req,res)=>{
    const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) => product.id_prod === pid
      );

      cart.products.splice(productIndex, 1);
      await cart.save();
      res.status(200).send(`Producto:${pid} eliminado`);
    }
  } catch (e) {
    res.status(400).send({ error: e });
  }
}

export const putCart = async (req,res)=>{
    const { cid } = req.params;
    const productsToUpdate = req.body;
  
    try {
      const cart = await cartModel.findById(cid);
  
      if (cart) {
        productsToUpdate.forEach((product) => {
          const prod = cart.products.find(
            (cartId) => cartId.id_prod == product.id_prod
          );
          if (prod) {
            prod.quantity += product.quantity;
          } else {
            cart.products.push(product);
          }
        });
  
        await cart.save();
        res.status(200).send(`Productos del carrito ${cid} actualizados`);
      } else {
        res.status(400).send("El carrito no existe");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error al actualizar el carrito ${error}`);
    }


}

export const putProductInCart = async (req,res)=>{
    const { cid,pid } = req.params;
    const {quantity}= req.body;

  try {
    const cart = await cartModel.findById(cid);

    if (cart) {
      
      const prod = cart.products.find(product => product.id_prod == pid)
      if(prod){
        prod.quantity += quantity
      }else{
        res.status(400).send(`No se encontro el id del producto`)
      }

      await cart.save();
      res.status(200).send(`Cantidad de Productos actualizados`);
    } else {
      res.status(400).send("El carrito no existe");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al actualizar el carrito ${error}`);
  }
}