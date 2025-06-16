import { Router } from "express";
import { register, login, deleteUser } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/user/:id", deleteUser);

export default router;
