const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor Express de Volta e Estável! ✅");
});

app.post("/organizar-lotes", (req, res) => {
    const processos = req.body.processos || [];
    const contagem = {};
    processos.forEach(p => {
        const nome = p.promotoria || "Desconhecida";
        contagem[nome] = (contagem[nome] || 0) + 1;
    });
    const lotesProntos = Object.keys(contagem).sort().map(nome => ({
        nomeLote: nome,
        quantidade: contagem[nome]
    }));
    res.json({ sucesso: true, lotes: lotesProntos });
});

module.exports = app;
