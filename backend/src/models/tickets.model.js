import { Schema, model } from "mongoose";


 

export const ticketSchema  = new Schema({
      
  code: {
    type:String,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    
  },
  purchaser: {
    type: String,
    unique: true
  }


})


const ticketModel = model('tickets', ticketSchema)
export default ticketModel