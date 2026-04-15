const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Apenas para teste no navegador
app.get("/", (req, res) => {
    res.send("Servidor Vercel Ativo e Voando! ⚡");
});

// A ROTA PRINCIPAL DA EXTENSÃO
app.post("/organizar-lotes", (req, res) => {
    const processos = req.body.processos || [];
    
    const contagem = {};
    processos.forEach(p => {
        const nome = p.promotoria || "Desconhecida";
        contagem[nome] = (contagem[nome] || 0) + 1;
    });

    const lotesProntos = Object.keys(contagem)
        .sort()
        .map(nome => {
            return { nomeLote: nome, quantidade: contagem[nome] };
        });

    res.json({
        sucesso: true,
        lotes: lotesProntos
    });
});

// A MÁGICA DA VERCEL ESTÁ AQUI:
// Em vez de ligar o servidor localmente, nós o exportamos.
module.exports = app;