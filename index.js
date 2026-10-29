const express = require('express');
require('dotenv').config(); // Carrega as variáveis do ficheiro .env

const app = express();

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Rota GET raiz de exemplo
app.get('/', (req, res) => {
    res.json({ mensagem: 'Servidor Express a funcionar corretamente!' });
});

// Rota POST /usuario (recebe { nome, idade })
app.post('/usuario', (req, res) => {
    const { nome, idade } = req.body;
    
    if (!nome || !idade) {
        return res.status(400).json({ erro: 'Os campos nome e idade são obrigatórios!' });
    }

    res.status(201).json({
        mensagem: 'Utilizador registado com sucesso!',
        usuario: { nome, idade }
    });
});

// Rota POST /produto (recebe os campos do exemplo do Postman)
app.post('/produto', (req, res) => {
    const { nomeProduto, marca, quantidade, preco } = req.body;

    if (!nomeProduto || !preco) {
        return res.status(400).json({ erro: 'O nome do produto e o preço são obrigatórios!' });
    }

    res.status(201).json({
        mensagem: 'Produto registado com sucesso!',
        produto: {
            nomeProduto,
            marca: marca || 'Genérica',
            quantidade: quantidade || 1,
            preco
        }
    });
});

// Configuração do servidor com a porta do .env (fallback para 4500)[cite: 3]
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});
