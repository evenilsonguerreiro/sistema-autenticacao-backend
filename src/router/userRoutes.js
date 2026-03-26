const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel'); 


// 2. Rota para Listar Usuários (Sua lógica original)
router.get('/users', async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// 3. Rota de Cadastro (Com SEU Regex e SEUS Ifs)
router.post('/users', async (req, res) => {
    console.log(req.body);
    const { name, email, senha } = req.body; 

    // SUAS VALIDAÇÕES ORIGINAIS:
    if(!name || !email || !senha) {
        return res.status(400).json({error: 'Todos os campos são obrigatórios!'});
    }

    // SEU REGEX DE E-MAIL:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({error: 'Formato de e-mail inválido!'});
    }

    try {
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);
        
        // Chamando o seu Model (passando o objeto como você definiu no userModel)
        await userModel.create({ name, email, senha: senhaHash });
        
        res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
        // SEU TRATAMENTO DE ERRO DE E-MAIL DUPLICADO (Código 23505 do Postgres):
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Este e-mail já está cadastrado!' });
        }
        
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

module.exports = router;

