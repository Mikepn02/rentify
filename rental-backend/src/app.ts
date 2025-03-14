import express from "express";
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv"
import cors = require('cors');
import bodyParser = require("body-parser");
import helmet from "helmet";
import swaggerFile from "../swagger-output.json";
import authRouter from "./routes/auth.routes";

const APP_NAME = "Node.js Express API with Swagger Documentation and TypeScript";

const app = express()
dotenv.config()

app.use(cors({
  origin: ['http://localhost:5000', "https://edtech-frontend-challenge.vercel.app","https://edtech-frontend-silk.vercel.app"],  
  credentials: true 
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(helmet());

app.get("/", (req , res) => {
   res.send(`
  <h1>${APP_NAME}</h1>
  <p>Documentation can be found at <a href="/api-docs">/api-docs</a></p>
  `);
})

app.use("/api-docs", swaggerUi.serve,swaggerUi.setup(swaggerFile))
app.use("/api/v1/auth", authRouter)


export default app;