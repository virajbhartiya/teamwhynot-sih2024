import { Router } from "express";
import { getCommoditiePrice } from "../controller/commodities.controller";

const router = Router();

router.get("/:commodity", getCommoditiePrice);

export default router;
