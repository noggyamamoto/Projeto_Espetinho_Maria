// Função para gerar a lista de itens selecionados
function gerarListaDeItens() {
    const itensSelecionados = Array.from(
        document.querySelectorAll('input[type="checkbox"]:checked')
    ).map(checkbox => checkbox.value);

    if (itensSelecionados.length > 0) {
        const lista = itensSelecionados.join(', ');
        const codigoUnico = gerarCodigoUnico();

        // Cria a mensagem para exibição no confirm
        const mensagemConfirmacao = `Número do Pedido: ${codigoUnico}\n\nItens selecionados:\n${itensSelecionados.join('\n')}\n\nDeseja enviar este pedido ao WhatsApp?`;

        // Exibe o confirm para o usuário
        const confirmarEnvio = confirm(mensagemConfirmacao);

        if (confirmarEnvio) {
            // Envia a mensagem para o WhatsApp
            enviarParaWhatsApp(lista, codigoUnico);
        } else {
            // O usuário clicou em "Cancelar"
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
function enviarParaWhatsApp(lista, codigo) {
    const numeroWhatsApp = "5561985613502"; // Substitua com o número do WhatsApp
    const mensagem = `Itens selecionados: ${lista}\nCódigo: ${codigo}`;
    const mensagemFormatada = encodeURIComponent(mensagem);

    // Cria o link do WhatsApp
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemFormatada}`;
    
    // Abre o WhatsApp com a mensagem pronta para envio
    window.open(linkWhatsApp, '_blank');
}
