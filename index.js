module.exports = (req, res) => {
    // 1. ABRINDO AS PORTAS (Substitui a biblioteca CORS)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Resposta rápida para o navegador saber que a porta está aberta antes de enviar os dados
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. TESTE NO NAVEGADOR
    if (req.method === 'GET') {
        return res.status(200).send("Servidor Nativo e Ultra-Leve Ativo! ⚡");
    }

    // 3. A LÓGICA DA EXTENSÃO (O Motor de Contagem)
    if (req.method === 'POST') {
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

        return res.status(200).json({
            sucesso: true,
            lotes: lotesProntos
        });
    }

    // Se chegar qualquer outra coisa, devolve erro 404
    return res.status(404).json({ erro: "Rota não encontrada" });
};
