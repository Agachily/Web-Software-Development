import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { app } from "../../app.js"

Deno.test("GetHello", async () => {
    const testClient = await superoak(app);
    await testClient.get("/api/hello").expect({"message": "Oh, hello there!"})
  })
  
  Deno.test("SetHello", async () => {
    const testClient = await superoak(app);
    await testClient.post("/api/hello").send({"message":"Kick ass"}).expect(200)
  })