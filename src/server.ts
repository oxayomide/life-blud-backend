import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app: Express = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
