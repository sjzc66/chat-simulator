class MessageManager {
    constructor(chatContent) {
        this.messages = [];
        this.chatContent = chatContent;
        this.emojiMap = {
            '[强]': '💪',
            '[弱]': '😩',
            '[握手]': '🤝',
            '[胜利]': '✌️',
            '[抱拳]': '🙏',
            '[勾引]': '😉',
            '[拳头]': '👊',
            '[差劲]': '👎',
            '[爱你]': '🥰',
            '[NO]': '🙅',
            '[OK]': '👌',
            '[耶]': '✌️',
            '[抱抱]': '🤗',
            '[坏笑]': '😏',
            '[笑哭]': '😂',
            '[呲牙]': '😁',
            '[调皮]': '😜',
            '[偷笑]': '🤭',
            '[再见]': '👋',
            '[捂脸]': '🤦',
            '[奸笑]': '😈',
            '[喜欢]': '😊',
            '[酷]': '😎'
        };
    }

    addMessage(content, user, type = 'text') {
        const processedContent = type === 'text' ? this.processEmoji(content) : content;
        const message = {
            id: Date.now(),
            content: processedContent,
            type: type,
            userId: user.id,
            timestamp: new Date().toLocaleTimeString()
        };

        this.messages.push(message);
        this.chatContent.renderMessage(message, user);
        return message;
    }

    processEmoji(content) {
        return content.replace(/\[[^\]]+\]/g, match => {
            return this.emojiMap[match] || match;
        });
    }

    async addImageMessage(file, user) {
        if (!file || !user) return;

        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.addMessage(e.target.result, user, 'image');
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('图片处理失败:', error);
            alert('图片处理失败');
        }
    }

    clear() {
        this.messages = [];
        this.chatContent.clear();
    }

    validateMessageInput(content, currentUser) {
        if (!currentUser) {
            alert('请先选择发送消息的用户');
            return false;
        }

        if (!content) {
            alert('请输入消息内容');
            return false;
        }
        return true;
    }
}
// 修改图片路径前缀
const imagePrefix = '/chat-simulator';