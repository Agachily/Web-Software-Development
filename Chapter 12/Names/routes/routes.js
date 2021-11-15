import * as nameController from "./controllers/nameController.js"
import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const router = new Router();

router.get("/names", nameController.getNames).post("/names", nameController.addName)

export {router}