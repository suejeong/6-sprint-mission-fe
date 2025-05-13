const express = require("express");
const cors = require("cors");
import app from './app.js'

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

app.listen(PORT, () => {
    console.log(`Server running at PORT : ${PORT}`);
})