import express, { Router } from "express";
import { lookUpMail } from "../controllers/authController";

const router: Router = express.Router();

router.post("/look-up", lookUpMail);

export { router as authRoute };
