// Função para gerar a lista de itens selecionados
function gerarListaDeItens() {
    const itensSelecionados = Array.from(
        document.querySelectorAll('input[type="checkbox"]:checked')
    ).map(checkbox => ({
        nome: checkbox.value,
        preco: parseFloat(checkbox.dataset.preco || 0) // Obtém o preço do atributo data-preco
    }));

    if (itensSelecionados.length > 0) {
        const lista = itensSelecionados.map(item => item.nome).join(', ');
        const total = itensSelecionados.reduce((acc, item) => acc + item.preco, 0).toFixed(2);
        const codigoUnico = gerarCodigoUnico();

        // Exibe um confirm para confirmação do pedido
        const mensagemConfirmacao = `Número do Pedido: ${codigoUnico}\n\nItens selecionados:\n${itensSelecionados.map(item => `${item.nome} - R$${item.preco.toFixed(2)}`).join('\n')}\n\nTotal do Pedido: R$${total}\n\nDeseja enviar este pedido ao WhatsApp?`;

        const confirmarEnvio = confirm(mensagemConfirmacao);

        if (confirmarEnvio) {
            enviarParaWhatsApp(lista, codigoUnico, total);
        } else {
            alert("Você pode revisar os itens antes de enviar!");
        }
    } else {
        alert("Por favor, selecione ao menos um item!");
    }
}

// Função para gerar um código único (número de 1 a 999)
function gerarCodigoUnico() {
    return Math.floor(Math.random() * 999) + 1; // Número entre 1 e 999
}

// Função para enviar a mensagem para o WhatsApp
function enviarParaWhatsApp(lista, codigo, total) {
    const numeroWhatsApp = "5561985613502"; // Substitua com o número do WhatsApp
    const mensagem = `Aqui é o atendente virtual do Espetinho da Maria.\n\nVim te avisar que seu pedido foi realizado com sucesso e já está em preparo.\n\n*Nº do pedido:* ${codigo}\n\n*Itens:* ${lista}\n\n*Total do pedido:* R$${total}`;
    const mensagemFormatada = encodeURIComponent(mensagem);

    // Cria o link do WhatsApp
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemFormatada}`;
    
    // Abre o WhatsApp com a mensagem pronta para envio
    window.open(linkWhatsApp, '_blank');
}
