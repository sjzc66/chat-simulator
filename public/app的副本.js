class ChatSimulator {
    constructor() {
        this.initState();
        this.addDefaultUsers();
        this.initializeEventListeners();
        this.updateUnreadCount();  // 添加这行
    }

    initState() {
        this.state = {
            carrier: '中国移动',
            networkType: 'Wifi',
            battery: 65,
            users: [],
            messages: [],
            currentUser: null,
            unreadCount: 5  // 添加未读消息数状态
        };
    }

    initializeEventListeners() {
        this.initTabEvents();
        this.initSettingsEvents();
        this.initMessageEvents();
        
        // 添加未读消息数监听
        document.getElementById('unreadCount').addEventListener('input', (e) => {
            this.state.unreadCount = e.target.value;
            this.updateUnreadCount();
        });
    }

    // 添加更新未读消息数的方法
    updateUnreadCount() {
        const unreadCountElement = document.querySelector('.unread-count');
        if (unreadCountElement) {
            unreadCountElement.textContent = this.state.unreadCount;
        }
    }

    initTabEvents() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });
    }

    initSettingsEvents() {
        const settings = {
            carrier: value => this.updateCarrier(value),
            networkType: value => this.updateNetworkType(value),
            battery: value => this.updateBattery(value)
        };

        Object.entries(settings).forEach(([id, handler]) => {
            const element = document.getElementById(id);
            const eventType = id === 'battery' ? 'input' : 'change';
            element.addEventListener(eventType, e => handler(e.target.value));
        });
    }

    initMessageEvents() {
        const messageActions = {
            addTextMsg: () => this.addMessage(),
            clearChat: () => this.clearChat(),
            generateImage: () => this.generateImage(),
            addUser: () => this.addUser()
        };

        Object.entries(messageActions).forEach(([id, handler]) => {
            document.getElementById(id).addEventListener('click', handler);
        });
    }

    // 状态更新方法
    updateCarrier(value) {
        this.state.carrier = value;
        this.updateStatusBar();
    }

    updateNetworkType(value) {
        this.state.networkType = value;
        this.updateStatusBar();
    }

    updateBattery(value) {
        this.state.battery = value;
        document.getElementById('batteryValue').textContent = `${value}%`;
        this.updateStatusBar();
    }

    // 优化消息渲染方法
    renderMessage(message) {
        const user = this.state.users.find(u => u.id === message.userId);
        const messageElement = this.createMessageElement(user, message);
        this.appendMessageToContainer(messageElement);
    }

    createMessageElement(user, message) {
        const container = document.createElement('div');
        container.className = `message ${user.isAdmin ? 'sent' : ''}`;
        
        const messageContent = this.createMessageContent(message.content);
        const avatar = this.createAvatar(user.avatar);
        
        container.appendChild(avatar);
        container.appendChild(messageContent);
        
        return container;
    }

    createMessageContent(content) {
        const element = document.createElement('div');
        element.className = 'content';
        element.textContent = content;
        return element;
    }

    createAvatar(src) {
        const avatar = document.createElement('img');
        avatar.src = src;
        avatar.className = 'avatar';
        return avatar;
    }

    appendMessageToContainer(messageElement) {
        document.getElementById('chatContainer').appendChild(messageElement);
    }

    switchTab(tabName) {
        // 更新标签按钮状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // 更新内容区域显示
        const appearanceSettings = document.getElementById('appearanceSettings');
        const chatSettings = document.getElementById('chatSettings');
        
        if (tabName === 'appearance') {
            appearanceSettings.style.display = 'block';
            chatSettings.style.display = 'none';
        } else {
            appearanceSettings.style.display = 'none';
            chatSettings.style.display = 'block';
        }
    }

    updateStatusBar() {
        const left = document.querySelector('.status-bar .left');
        const right = document.querySelector('.status-bar .right');
        
        left.textContent = `${this.state.carrier} 21:07`;
        right.textContent = `信号 ${this.state.networkType} ${this.state.battery}%`;
    }

    addUser() {
        const user = {
            id: Date.now(),
            name: `用户${this.state.users.length + 1}`,
            isAdmin: this.state.users.length === 0,
            avatar: this.generateAvatarPath()
        };
        this.state.users.push(user);
        this.state.currentUser = user;
        this.updateUserList();
        alert(`已添加并选择用户: ${user.name}`);
    }

    generateAvatarPath() {
        const avatarIndex = Math.floor(Math.random() * 20) + 1;
        return `/resources/avatars/avatar_${avatarIndex}.svg`;
    }

    updateUserList() {
        const chatSettings = document.getElementById('chatSettings');
        const userList = this.createUserListElement();
        this.replaceOldUserList(chatSettings, userList);
        this.bindUserSelectEvents(userList);
    }

    createUserListElement() {
        const userList = document.createElement('div');
        userList.className = 'user-list';
        userList.innerHTML = `
            <h3>当前用户列表：</h3>
            ${this.state.users.map(user => this.createUserItemHTML(user)).join('')}
        `;
        return userList;
    }

    createUserItemHTML(user) {
        return `
            <div class="user-item ${user.id === this.state.currentUser?.id ? 'active' : ''}" 
                 data-user-id="${user.id}">
                <img src="${user.avatar}" alt="头像" class="user-avatar">
                <span>${user.name}</span>
                <span>${user.isAdmin ? '(主人)' : ''}</span>
            </div>
        `;
    }

    replaceOldUserList(chatSettings, newUserList) {
        const oldUserList = chatSettings.querySelector('.user-list');
        if (oldUserList) {
            oldUserList.remove();
        }
        const messageInput = chatSettings.querySelector('.user-input');
        messageInput.parentNode.insertBefore(newUserList, messageInput);
    }

    bindUserSelectEvents(userList) {
        userList.querySelectorAll('.user-item').forEach(item => {
            item.addEventListener('click', () => {
                const userId = parseInt(item.dataset.userId);
                this.state.currentUser = this.state.users.find(u => u.id === userId);
                this.updateUserList();
            });
        });
    }

    addMessage() {
        if (!this.validateMessageInput()) return;

        const message = this.createMessage();
        this.state.messages.push(message);
        this.renderMessage(message);
        this.clearMessageInput();
    }

    validateMessageInput() {
        if (!this.state.currentUser) {
            alert('请先选择发送消息的用户');
            return false;
        }

        const content = document.getElementById('messageContent').value;
        if (!content) {
            alert('请输入消息内容');
            return false;
        }
        return true;
    }

    createMessage() {
        return {
            id: Date.now(),
            content: document.getElementById('messageContent').value,
            userId: this.state.currentUser.id,
            timestamp: new Date().toLocaleTimeString()
        };
    }

    renderMessage(message) {
        const user = this.state.users.find(u => u.id === message.userId);
        const container = document.createElement('div');
        container.className = `message ${user.isAdmin ? 'sent' : ''}`;
        
        const avatar = document.createElement('img');
        avatar.src = user.avatar;
        avatar.className = 'avatar';
        
        const content = document.createElement('div');
        content.className = 'content';
        content.textContent = message.content;
        
        container.appendChild(avatar);
        container.appendChild(content);
        
        document.getElementById('chatContainer').appendChild(container);
    }

    clearMessageInput() {
        document.getElementById('messageContent').value = '';
    }

    clearChat() {
        this.state.messages = [];
        document.getElementById('chatContainer').innerHTML = '';
    }

    async generateImage() {
        try {
            const chatPreview = document.querySelector('.chat-preview');
            const canvas = await html2canvas(chatPreview);
            const link = document.createElement('a');
            link.download = 'chat.png';
            link.href = canvas.toDataURL();
            link.click();
        } catch (error) {
            console.error('生成图片失败:', error);
            alert('生成图片失败');
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.chatSimulator = new ChatSimulator();
});