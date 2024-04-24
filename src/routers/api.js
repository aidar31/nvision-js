import express from "express";
import ApiResponse from "../helpers/apiResponse.js";
import AuthController from "../controllers/authController.js";
import authMiddleware from "../middlewares/Authenticate.js";
import NovelController from "../controllers/novelsController.js";



const router = express.Router();


// Auth Routers
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/confirmation/:token", AuthController.confirmation);
router.get("/auth/logout", authMiddleware, AuthController.logout);


// Novels Routers
router.get("/novels", NovelController.index);
router.post("/novels", authMiddleware, NovelController.store);
router.get("/novels/:novelId", NovelController.show);
router.patch('/novels/:novelId', authMiddleware, NovelController.update);
router.delete('/novels/:novelId', authMiddleware, NovelController.destroy);

export default router;