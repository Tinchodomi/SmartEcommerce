
import supertest from "supertest";
import mongoose from "mongoose";

const requester = supertest("http://localhost:4000");

await mongoose
  .connect(
    "mongodb+srv://tinchodomi:Martin1991@cluster0.jghkycb.mongodb.net/SmartEcommerce"
  )
  .then(() => {
    console.log("Conectado a Mongo DB");
  })
  .catch((err) => {
    console.log("Error al conectarse a Mongo", err);
  });

describe("Testing app SmartEcommerce", () => {
  describe("Test de productos", () => {
    
    it("Test POST endpoint /api/products", async () => {
      
        const newProd = {
        title: 'Apple',
        description: '14 pro',
        price: 1000,
        stock: 100,
        category: 'Alta',
        status: true,
        code:'AAA1414'
        }
         

      await requester.post("/api/products").send(newProd);
      
    });

    it("Test GET endpoint /api/products", async () => {
       
        const {_body} = await requester.get("/api/products");
        console.log(_body)
        
      });

  });
});
