import adminAccess from "../controllers/adminAccess.js";
import { ADMIN } from "../paths.js";
import { Router } from "express";

const router = Router();

router.get(ADMIN, adminAccess)

export default router;