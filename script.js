// Classe responsável por gerenciar a seleção de itens
class ItemSelector {
    constructor() {
        this.selectedItems = [];
    }

    // Coleta os itens selecionados
    collectSelectedItems() {
        this.selectedItems = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            this.selectedItems.push(checkbox.value);
        });
        return this.selectedItems;
    }

    // Verifica se há itens selecionados
    hasSelectedItems() {
        return this.selectedItems.length > 0;
    }
}

// Classe responsável por gerar mensagens e códigos únicos
class MessageGenerator {
    // Gera um código único
    static generateUniqueCode() {
        return 'ID' + Math.random().toString(36).substr(2, 9);
    }

    // Formata a mensagem para envio
    static formatMessage(items, code) {
        return `Itens selecionados: ${items.join(', ')}\nCódigo: ${code}`;
    }
}

// Classe responsável por enviar mensagens para o WhatsApp
class WhatsAppSender {
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
        this.whatsAppSender = new WhatsAppSender('5561985613502'); // Substitua pelo número do WhatsApp
    }

    // Função principal para gerar a lista e enviar via WhatsApp
    run() {
        const selectedItems = this.itemSelector.collectSelectedItems();

        if (this.itemSelector.hasSelectedItems()) {
            const uniqueCode = MessageGenerator.generateUniqueCode();
            const message = MessageGenerator.formatMessage(selectedItems, uniqueCode);
            this.whatsAppSender.sendMessage(message);
        } else {
            alert("Por favor, selecione ao menos um item!");
        }
    }
}

// Instancia o aplicativo e executa
const app = new App();
document.querySelector('#botaoEnviar').addEventListener('click', () => app.run());