module.exports = (req, res) => {
    // 1. Libera o acesso para a extensão (CORS Manual)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Resposta para o navegador confirmar a conexão
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Mensagem de teste para o navegador
    if (req.method === 'GET') {
        return res.status(200).send("Servidor Nativo e Ultra-Leve Ativo! ⚡");
    }

    // 3. Lógica principal da extensão
    if (req.method === 'POST') {
        const processos = req.body.processos || [];
        const contagem = {};

        processos.forEach(p => {
            const nome = p.promotoria || "Desconhecida";
            contagem[nome] = (contagem[nome] || 0) + 1;
        });

        const lotesProntos = Object.keys(contagem)
            .sort()
            .map(nome => ({ nomeLote: nome, quantidade: contagem[nome] }));

        return res.status(200).json({
            sucesso: true,
            lotes: lotesProntos
        });
    }

    return res.status(404).send("Rota não encontrada");
};
