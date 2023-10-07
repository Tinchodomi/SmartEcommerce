import { Schema,model } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
          {
            id_prod: {
              type: Schema.Types.ObjectId, //id autogenerado de Mongo DB
              ref: "products", //referencia a la coleccion productos
              required: true,
            },
            quantity: {
              type: Number,
              default: 1,
            },
          },
        ],
        
        default: function () {
           return []
        }
    },
  });
  
  

  cartSchema.pre('findOne', function(){
    this.populate('products.id_prod')
  })
  

  


const cartModel = model('carts', cartSchema)
export default cartModel

