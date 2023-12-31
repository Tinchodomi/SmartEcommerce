import productModel from "../models/products.model.js";

export const getProducts = async (req, res) => {
    const { limit, page, filter, sort } = req.query

    const fil = filter ? filter : {}
    const pag = page ? page : 1
    const lim = limit ? limit : 10
    const ord = sort == 'des' ? 1 : -1
    console.log(fil)
    try {
        const products = await productModel.paginate({}, { limit: lim, page: pag, sort: { price: ord } })

        if (products) {
            return res.status(200).send(products)
        }

        res.status(404).send({ error: "Productos no encontrados" })

    } catch (error) {
        res.status(500).send({ error: `Error en consultar productos ${error}` })
    }

}

export const getProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productModel.findById(id)

        if (product) {
            return res.status(200).send(product)
        }

        res.status(404).send({ error: "Producto no encontrado" })

    } catch (error) {
        res.status(500).send({ error: `Error en consultar producto ${error}` })
    }
}

export const postProduct = async (req, res) => {

    const { title, description, code, price, stock, category } = req.body

    try {

        if (!title || !description || !price || !stock || !code || !category) {
            CustomError.createError({
                name: "Product creation error",
                cause: generateProductErrorInfo({ title, description, price, stock, code, category }),
                message: "One or more properties were incomplete or not valid.",
                code: EErrors.INVALID_PRODUCT_ERROR
            })
        }
       
        const product = await productModel.create({ title, description, code, price, stock, category })

        if (product) {
            return res.status(201).send(product)
        }

        return res.status(404).send({ error: "Producto no encontrado" })

    } catch (error) {
        
        next(error)
        
        if (error.code == 11000) {
            return res.status(400).send({ error: `Llave duplicada` })
        } else {
            return res.status(500).send({ error: `Error en consultar producto ${error}` })
        }
        
    }
}

export const putProduct = async (req, res) => {
    const { id } = req.params
    const { title, description, code, price, stock, category } = req.body
    try {
        const product = await productModel.findByIdAndUpdate(id, { title, description, code, price, stock, category })

        if (product) {
            return res.status(200).send(product)
        }

        res.status(404).send({ error: "Producto no encontrado" })

    } catch (error) {
        res.status(500).send({ error: `Error en actualizar producto ${error}` })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await productModel.findByIdAndDelete(id)

        if (product) {
            return res.status(200).send(product)
        }

        res.status(404).send({ error: "Producto no encontrado" })

    } catch (error) {
        res.status(500).send({ error: `Error en eliminar producto ${error}` })
    }
}