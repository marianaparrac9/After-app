import express, { Router } from "express";
import cors from "cors";
import { CLIENT_ORIGIN } from "./config/config";
import { errorsMiddleware } from "./middlewares/errorsMiddleware";
import { router as authRouter } from "./features/auth/auth.router";
import { router as eventsRouter } from "./features/events/event.router";
import { router as savedRouter } from "./features/saved/saved.router";
import { router as attendanceRouter } from "./features/attendance/attendance.router";
import { router as productsRouter } from "./features/products/product.router";
import { router as paymentsRouter } from "./features/payments/payment.router";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN === "*" ? true : CLIENT_ORIGIN.split(","),
  })
);

app.get("/", (_req, res) => {
  res.json({ name: "After API" });
});

const apiRouter = Router();
app.use("/api", apiRouter);

apiRouter.use("/auth", authRouter);
apiRouter.use("/events", eventsRouter);
apiRouter.use("/saved", savedRouter);
apiRouter.use("/attendance", attendanceRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/payments", paymentsRouter);

app.use(errorsMiddleware);

export default app;
