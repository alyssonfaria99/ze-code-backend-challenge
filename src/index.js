require("dotenv").config();
const routes = require('./router.js')
const express = require('express');

const app = express()


app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`servidor rodando na porta ${process.env.PORT}`);
})