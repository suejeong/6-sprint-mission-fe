import express from 'express';
import productRoutes from './routes/product.js';

const app = express();

app.use(express.json());
app.use('/product', productRoutes)