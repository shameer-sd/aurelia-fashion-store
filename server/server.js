import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/payments', paymentRoutes);

app.get("/api/v1/health", (req, res) => {
    res.json({
        success: true,
        message: "AURELIA API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});