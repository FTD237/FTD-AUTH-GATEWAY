import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config";
import authRoutes from "./api/routes/auth.routes";
import { loggerMiddleware } from "./api/middleware/logger.middleware";
import { apiLimiter } from "./api/middleware/rate-limiter.middleware";
import { errorHandler } from "./utils/error-handler";

const app = express();

const corsOptions = {
  origin: true, // Accepte toutes les origines (*)
  credentials: true, // Autoriser les cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-API-Key',
    'Cache-Control'
  ],
  exposedHeaders: ['X-Total-Count'], // Headers exposés au client
  maxAge: 86400 // Cache preflight pendant 24h
};


app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use(apiLimiter);


app.get("/status", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date(),
    environment: config.app.environment,
  });
});

app.use("/", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Not found",
  });
});

app.use(errorHandler);

export default app;
