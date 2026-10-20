import express from "express";
import cors from "cors";
import { CLIENT_ORIGIN, NODE_ENV, PORT } from "./config";
import { errorsMiddleware } from "./middlewares/errorsMiddleware";
import { router as productsRouter } from "./features/products/product.router";
import { router as clientsRouter } from "./features/clients/client.router";
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

app.use("/api/products", productsRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/payments", paymentsRouter);

app.use(errorsMiddleware);

if (NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
  });
}

export default app;
