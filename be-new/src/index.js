import express from "express";
import cors from "cors";
import productRouter from './routes/product.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/product', productRouter);

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

app.listen(PORT, () => {
    console.log(`Server running at PORT : ${PORT}`);
})

