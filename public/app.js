class ChatSimulator {
    constructor() {
        this.initState();
        this.initComponents();
        this.initializeEventListeners();
        this.updateUI();
    }

    initState() {
        this.state = {
            carrier: '中国移动',
            networkType: 'Wifi',
            battery: 65,
            unreadCount: 5,
            phoneTime: '21:07',
            currentTab: 'appearance',
            chatTitle: '聊天人名称'
        };
    }
    
    initComponents() {
        this.statusBar = new StatusBar(document.querySelector('.status-bar'));
        this.chatHeader = new ChatHeader(document.querySelector('.chat-header'));
        this.chatContent = new ChatContent(document.getElementById('chatContainer'));
        this.settingsPanel = new SettingsPanel(document.querySelector('.settings-tabs'));
        this.userManager = new UserManager();
        this.messageManager = new MessageManager(this.chatContent);
    
        // 设置标签切换回调
        this.settingsPanel.setOnTabChange((tabName) => {
            this.state.currentTab = tabName;
            this.updateUI();
        });
    
        // 初始化默认用户
        this.userManager.addDefaultUsers();
    
        // 添加用户更新回调
        this.userManager.onUserUpdate = () => {
            this.updateUI();
        };
    }

    initializeEventListeners() {
        this.bindSettingsEvents();
        this.bindMessageActions();
    }

    bindSettingsEvents() {
        const settingsMap = {
            carrier: 'change',
            networkType: 'change',
            battery: 'input',
            unreadCount: 'input',
            phoneTime: 'change',
            chatTitle: 'input'
        };

        Object.entries(settingsMap).forEach(([id, event]) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener(event, (e) => {
                    this.state[id] = e.target.value;
                    this.updateUI();
                });
            }
        });
    }

    bindMessageActions() {
        const actions = {
            addTextMsg: () => {
                const content = document.getElementById('messageContent')?.value;
                if (!content) return;
                
                if (this.userManager.currentUser) {
                    this.messageManager.addMessage(content, this.userManager.currentUser);
                    document.getElementById('messageContent').value = '';
                } else {
                    alert('请先选择发送消息的用户');
                }
            },
            addImageMsg: () => document.getElementById('imageInput').click(),
            clearChat: () => this.messageManager.clear(),
            generateImage: () => this.generateImage(),
            addUser: () => {
                const user = this.userManager.addUser();
                this.updateUI();
            }
        };

        // 添加图片上传处理
        document.getElementById('imageInput')?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && this.userManager.currentUser) {
                this.messageManager.addImageMessage(file, this.userManager.currentUser);
                e.target.value = ''; // 清空选择
            }
        });

        Object.entries(actions).forEach(([id, handler]) => {
            document.getElementById(id)?.addEventListener('click', handler.bind(this));
        });
    }

    updateUI() {
        this.statusBar.update(this.state);
        this.chatHeader.update(this.state);
        this.settingsPanel.updateTab(this.state.currentTab);
        
        // 更新用户列表
        const chatSettings = document.getElementById('chatSettings');
        if (chatSettings) {
            const oldUserList = chatSettings.querySelector('.user-list');
            const newUserList = this.userManager.renderUserList(chatSettings, () => this.updateUI());
            
            if (oldUserList) {
                oldUserList.replaceWith(newUserList);
            } else {
                const messageInput = chatSettings.querySelector('.user-input');
                messageInput?.parentNode.insertBefore(newUserList, messageInput);
            }
        }
    }

    addMessage() {
        const content = document.getElementById('messageContent')?.value;
        if (!content) return;
        
        if (this.messageManager.validateMessageInput(content, this.userManager.currentUser)) {
            this.messageManager.addMessage(content, this.userManager.currentUser);
            document.getElementById('messageContent').value = '';
        }
    }

    async generateImage() {
        try {
            const chatPreview = document.querySelector('.chat-preview');
            if (!chatPreview) return;
    
            // 在生成图片前处理 SVG 图标
            const svgIcons = chatPreview.querySelectorAll('.network-icon, .battery-icon');
            svgIcons.forEach(icon => {
                const computedStyle = window.getComputedStyle(icon);
                const maskImage = computedStyle.webkitMaskImage || computedStyle.maskImage;
                if (maskImage && maskImage !== 'none') {
                    // 临时转换为背景图
                    icon.style.webkitMaskImage = 'none';
                    icon.style.maskImage = 'none';
                    icon.style.backgroundColor = 'transparent';
                    icon.style.backgroundImage = maskImage;
                    icon.style.backgroundSize = '16px';
                    icon.style.backgroundPosition = 'center';
                    icon.style.backgroundRepeat = 'no-repeat';
                }
            });
    
            const canvas = await html2canvas(chatPreview, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                scale: 2
            });
    
            // 恢复原始样式
            svgIcons.forEach(icon => {
                icon.style.webkitMaskImage = '';
                icon.style.maskImage = '';
                icon.style.backgroundColor = '';
                icon.style.backgroundImage = '';
                icon.style.backgroundSize = '';
                icon.style.backgroundPosition = '';
                icon.style.backgroundRepeat = '';
            });
    
            const link = document.createElement('a');
            link.download = 'chat.png';
            link.href = canvas.toDataURL('image/png');
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