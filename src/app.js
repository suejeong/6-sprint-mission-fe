import express from "express";
import cors from 'cors';
import router from './modules/index.module.js';
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 7777;

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(router);



// 서버 실행
app.listen(PORT, () => {
    console.log(`서버가 실행 중: http://localhost:${PORT}`);
});

