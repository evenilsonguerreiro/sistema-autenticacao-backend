require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/router/userRoutes');

const {neon} = require('@neondatabase/serverless');

const app = express();


app.use(express.json());
app.use(cors());

app.get('/', async (req,res) => {
    res.status(200).json({message: 'Bem vindo ao nosso servidor!'});
});

app.use('/', userRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});