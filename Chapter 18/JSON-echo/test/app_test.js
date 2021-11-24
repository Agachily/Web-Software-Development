import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";

import { app } from "../app.js";

// Success tests
Deno.test("test1", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
      .send({ "name" : "Jane"  })
      .expect({ "name" : "Jane"  })
})

Deno.test("test2", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
      .send({ "name" : "Lao Zhang"  })
      .expect({ "name" : "Lao Zhang"  })
})

Deno.test("test3", async () => {
    const testClient = await superoak(app);
    await testClient.post("/name")
      .send({ "name" : "Lao Zhang"  })
      .expect({ "name" : "Lao Zhang"  })
})

// Failed Tests
Deno.test("test4", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
      .send({ "name" : "Lao Zhang"  })
      .expect({ "name" : "Lao Wang"  })
})

Deno.test("test5", async () => {
    const testClient = await superoak(app);
    await testClient.post("/name")
      .send({ "name" : "Lao Zhang"  })
      .expect({ "name" : "Lao Wang"  })
})