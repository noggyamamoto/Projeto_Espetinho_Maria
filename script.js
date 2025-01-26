// Função para gerar a lista de itens selecionados
function gerarListaDeItens() {
    let itensSelecionados = [];

    // Coleta os itens selecionados nas seções de "Porções" e "Bebidas"
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        itensSelecionados.push(checkbox.value);
    });

    // Se houver itens selecionados
    if (itensSelecionados.length > 0) {
        let lista = itensSelecionados.join(', ');
        let codigoUnico = gerarCodigoUnico();
        enviarParaWhatsApp(lista, codigoUnico);
    } else {
        alert("Por favor, selecione ao menos um item!");
    }
}

// Função para gerar um código único
function gerarCodigoUnico() {
    return 'ID' + Math.random().toString(36).substr(2, 9);  // Código único de 9 caracteres aleatórios
}

// Função para enviar a mensagem para o WhatsApp
function enviarParaWhatsApp(lista, codigo) {
    let numeroWhatsApp = "5561985613502";  // Substitua com o número do WhatsApp
    let mensagem = `Itens selecionados: ${lista}\nCódigo: ${codigo}`;

    // Codifica a mensagem para URL
    let mensagemFormatada = encodeURIComponent(mensagem);

    // Cria o link do WhatsApp
    let linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemFormatada}`;

    // Abre o WhatsApp com a mensagem pronta para envio
    window.open(linkWhatsApp, '_blank');
}