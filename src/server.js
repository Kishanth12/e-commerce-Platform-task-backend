import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import  {swaggerDocs} from "./config/swagger.js";
import morgan from "morgan";

dotenv.config();
connectDb();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(morgan('dev'))

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

swaggerDocs(app, port);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
