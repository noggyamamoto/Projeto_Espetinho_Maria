// Classe responsável por gerenciar a seleção de itens
class ItemSelector {
    constructor() {
        this.selecao_itens = [];
    }

    // Coleta os itens selecionados
    coleta_itens() {
        this.selecao_itens = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            this.selecao_itens.push(checkbox.value);
        });
        return this.selecao_itens;
    }

    // Verifica se há itens selecionados
    verifica_itens_selecionados() {
        return this.selecao_itens.length > 0;
    }
}

// Classe responsável por gerar mensagens e códigos únicos
class Gerador_Mensagens_Codigos {
    // Gera um código único
    static gera_id_unico() {
        return 'ID' + Math.random().toString(36).substr(2, 9);
    }

    // Formata a mensagem para envio
    static formata_mensagem(items, code) {
        return `Itens selecionados: ${items.join(', ')}\nCódigo: ${code}`;
    }
}

// Classe responsável por enviar mensagens para o WhatsApp
class Enviar_WhatsApp {
    constructor(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    // Envia a mensagem via WhatsApp
    sendMessage(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank');
    }
}

// Classe principal para gerenciar o fluxo da aplicação
class App {
    constructor() {
        this.itemSelector = new ItemSelector();
        this.whatsAppSender = new Enviar_WhatsApp('5561985613502'); // Substitua pelo número do WhatsApp
    }

    // Função principal para gerar a lista e enviar via WhatsApp
    run() {
        const selectedItems = this.itemSelector.coleta_itens();

        if (this.itemSelector.verifica_itens_selecionados()) {
            const uniqueCode = Gerador_Mensagens_Codigos.gera_id_unico();
            const message = Gerador_Mensagens_Codigos.formata_mensagem(selectedItems, uniqueCode);
            this.whatsAppSender.sendMessage(message);
        } else {
            alert("Por favor, selecione ao menos um item!");
        }
    }
}

// Instancia o aplicativo e executa
const app = new App();
document.querySelector('#botaoEnviar').addEventListener('click', () => app.run());