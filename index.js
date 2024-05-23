const express = require('express');
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const { getAllProducts } = require('./product');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Apply CORS middleware globally, excluding /api/client routes
app.use((req, res, next) => {
    if (req.path.startsWith('/api/client')) {
        // Allow all origins for /api/client routes
        cors()(req, res, next)
    } else {
        // Use your corsOptions for other routes
        cors(corsOptions)(req, res, next);
    }
});


app.get("/", (req, res) => {
    return res.json({ status: 200, message: `server is live on port ${process.env.PORT}` })
})

app.get("/products", async (req, res) => {
    console.log("==PRODUCTS==");
    let products = []
    products = await getAllProducts()
    return res.json({ status: 200, products })
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is live on port::${PORT}`));

module.exports = { app }