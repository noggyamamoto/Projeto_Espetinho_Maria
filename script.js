// Classe Item
class Item {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }

    toString() {
        return `${this.nome} - R$${this.preco.toFixed(2)}`;
    }
}

// Classe Pedido
class Pedido {
    constructor() {
        this.itens = [];
        this.codigoUnico = this.gerarCodigoUnico();
    }

    adicionarItem(item) {
        this.itens.push(item);
    }

    gerarCodigoUnico() {
        return Math.floor(Math.random() * 999) + 1;
    }

    calcularTotal() {
        return this.itens.reduce((acc, item) => acc + item.preco, 0).toFixed(2);
    }

    getListaItens() {
        return this.itens.map(item => item.toString()).join('\n');
    }

    getMensagemConfirmacao() {
        return `Número do Pedido: ${this.codigoUnico}\n\nItens selecionados:\n${this.getListaItens()}\n\nTotal do Pedido: R$${this.calcularTotal()}\n\nDeseja enviar este pedido ao WhatsApp?`;
    }
}

// Classe WhatsAppService
class WhatsAppService {
    constructor(numeroWhatsApp) {
        this.numeroWhatsApp = numeroWhatsApp;
    }

    enviarMensagem(pedido) {
        const mensagem = `Obrigado por comprar no Espetinho da Maria!\n\n*Nº do pedido:* ${pedido.codigoUnico}\n\n*Itens:* ${pedido.getListaItens()}\n\n*Total do pedido:* R$${pedido.calcularTotal()}`;
        const mensagemFormatada = encodeURIComponent(mensagem);
        const linkWhatsApp = `https://api.whatsapp.com/send?phone=${this.numeroWhatsApp}&text=${mensagemFormatada}`;
        window.open(linkWhatsApp, '_blank');
    }
}

// Função principal
function gerarListaDeItens() {
    const itensSelecionados = Array.from(
        document.querySelectorAll('input[type="checkbox"]:checked')
    ).map(checkbox => new Item(checkbox.value, parseFloat(checkbox.dataset.preco || 0)));

    if (itensSelecionados.length > 0) {
        const pedido = new Pedido();
        itensSelecionados.forEach(item => pedido.adicionarItem(item));

        const confirmarEnvio = confirm(pedido.getMensagemConfirmacao());

        if (confirmarEnvio) {
            const whatsAppService = new WhatsAppService("5561985613502");
            whatsAppService.enviarMensagem(pedido);
        } else {
            alert("Você pode revisar os itens antes de enviar!");
        }
    } else {
        alert("Por favor, selecione ao menos um item!");
    }
}