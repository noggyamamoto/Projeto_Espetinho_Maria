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
            enviarParaWhatsapp(lista, codigoUnico);
        } else {
            alert("Por favor, selecione ao menos um item!");
        }
    }

    // Função para gerar um código único
    function gerarCodigoUnico() {
        return 'ID' + Math.random().toString(36).substr(2, 9);  // Código único de 9 caracteres aleatórios
    }

    // Função para enviar a lista para o WhatsApp
    function enviarParaWhatsapp(lista, codigo) {
        let mensagem = `Itens selecionados: ${lista}\nCódigo: ${codigo}`;
        let numeroWhatsApp = "5561985613502";  // Substitua com o número do WhatsApp
        let urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(urlWhatsApp, '_blank');  // Abre a página do WhatsApp com a mensagem
    }