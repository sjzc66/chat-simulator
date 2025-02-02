class ChatContent {
    constructor(container) {
        this.container = container;
    }

    renderMessage(message, user) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${user.isAdmin ? 'sent' : ''}`;
        
        const content = message.type === 'image' 
            ? `<div class="message-content"><img src="${message.content}" alt="聊天图片" class="chat-image"></div>` 
            : `<div class="message-content"><span>${message.content}</span></div>`;

        messageEl.innerHTML = `
            <img src="${user.avatar}" alt="头像" class="avatar">
            ${content}
        `;
        
        this.container.appendChild(messageEl);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.container.scrollTop = this.container.scrollHeight;
    }

    clear() {
        this.container.innerHTML = '';
    }
}