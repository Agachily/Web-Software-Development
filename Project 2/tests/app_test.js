import {app} from "../app.js"
import { superoak } from "../deps.js";

Deno.test("GET to / and get the main page", async () => {
    const testClient = await superoak(app);
    await testClient.get("/")
      .expect(new RegExp("Question Application"));
})

Deno.test("GET to /auth/login and get the login form", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/login")
      .expect(new RegExp("Login form"));
})

Deno.test("GET to /auth/register login will get the login form", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/register")
      .expect(new RegExp("Registration Form"));
})

Deno.test("POST to /quiz/:id/options/:optionId before login will get the login form", async () => {
    const testClient = await superoak(app);
    await testClient.get("/quiz/1/options/2")
      .expect(new RegExp("/auth/login"));
})

Deno.test("GET to /questions before login will get the login form", async () => {
    const testClient = await superoak(app);
    await testClient.get("/questions")
      .expect(new RegExp("/auth/login"));
})

Deno.test("GET to /questions before login will get the login form", async () => {
    const testClient = await superoak(app);
    await testClient.post("/questions")
      .expect(new RegExp("/auth/login"));
})

Deno.test("POST to /statistics before login will get the login form", async () => {
    const testClient = await superoak(app);
    await testClient.get("/statistics")
      .expect(new RegExp("/auth/login"));
})

Deno.test("GET to /quiz before login will get the login form", async () => {
    const testClient = await superoak(app);
    await testClient.get("/quiz")
      .expect(new RegExp("/auth/login"));
})

Deno.test({
    name: "GET to /api/questions/answer will be answered",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/api/questions/random")
      .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST to /api/questions/answer will be answered",
    async fn() {
      const testClient = await superoak(app);
      await testClient.post("/api/questions/answer")
      .send({"questionId": 8, "optionId": 12})
      .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
