import { Router } from "express";
import productModel from "../models/products.model.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  let { limit, page, category, sort} = req.query;

  let sin_query = {};// creo un query vacio para los parametros que no se piden y devuelve general

  if (!limit) {
    limit = 10; // en caso de no especificar limit, limit = 10
  }
  if (!page) {
    page = 1; // en caso de no especificar page, page = 1
  }

 if(category ){
   sin_query = {category} // filtramos por query category, aca pordia ser status, stock, etc
 }

  let option //defino una variable para sort vacia, para que sort sea = 0 y no ordene nada
  
  if(sort){
    option = {price : sort} //en caso de pedir sort, opcion se convierte en {price: aca va 1 o -1 en la request}
  }
  
  try {
    const busqueda = await productModel.paginate(sin_query, {
      limit: limit,
      page: page,
      sort : option
    });
    res.status(200).send(busqueda);
  } catch {
    res.status(400).send("Error al consultar los productos");
  }
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const products = await productModel.findById(id);

    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).send("ID Not Found");
    }
  } catch {
    res.status(400).send("Error al consultar id el producto");
  }
});

productRouter.post("/", async (req, res) => {
  const { title, description, stock, code, price, category } = req.body;

  try {
    const createProduct = await productModel.create({
      title,
      description,
      price,
      stock,
      category,
      code,
    });

    res.status(200).send(createProduct);
  } catch (err) {
    res.status(400).send({ error: "Error al crear el producto" });
  }
});

productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, stock, code, price, category, status } = req.body;

  try {
    const update = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      stock,
      code,
      price,
      category,
      status,
    });

    if (update) {
      res.status(200).send({ message: update });
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  } catch {
    res.status(400).send("Error al consultar id el producto");
  }
});

productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const del = await productModel.findByIdAndDelete(id);

    if (del) {
      res.status(200).send({ message: "Producto borrado" });
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  } catch {
    res.status(400).send("Error al consultar el producto");
  }
});

export default productRouter;
