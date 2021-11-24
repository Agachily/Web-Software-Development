import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { getHello, setHello } from "../../services/helloService.js";
import { app } from "../../app.js"

/** Test of the helloService.js */
Deno.test("getHello", async () => {
  assertEquals("Oh, hello there!", getHello());
})

Deno.test("setHelloe1", async () => {
  assertEquals(undefined, setHello())
})

Deno.test("setHelloe2", async () => {
  setHello("Kick ass")
  assertEquals("Kick ass", getHello())
})

Deno.test("setHelloe3", async () => {
  assertEquals(undefined, setHello("Kick Kick Kick ass"))
})


