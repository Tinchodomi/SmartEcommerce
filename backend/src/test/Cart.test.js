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
  describe("Test de Carts", () => {
    it("Test GET endpoint /api/carts", async () => {
      const { _body } = await requester.get("/api/carts");
      console.log(_body);
    });
  });
});
