import { Router } from "express";
import { LOGIN, REGISTER } from "../paths.js";
import { createUser } from "../controllers/Users/createUsers.js";
import { loginUser } from "../controllers/Users/loginUser.js";

const router = Router();

router.post(REGISTER, createUser)
router.post(LOGIN, loginUser)

export default router;