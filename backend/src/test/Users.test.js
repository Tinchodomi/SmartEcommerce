
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
  describe("Test de usuarios", () => {
    
    it("Test POST endpoint /api/users", async () => {
      const newUser = {
        first_name: "Elon",
        last_name: "Musk",
        email: "elon@musk.com",
        age: 54,
        password: "2345",
      };

      await requester.post("/api/users").send(newUser);
      
    });

    it("Test GET endpoint /api/users", async () => {
       
        const {_body} =await requester.get("/api/users");
        console.log(_body)
        
      });

  });
});
