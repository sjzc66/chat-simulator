class SettingsPanel {
    constructor(container) {
        this.container = container;
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.elements = {
            tabs: this.container.querySelectorAll('.tab-btn'),
            appearance: document.getElementById('appearanceSettings'),
            chat: document.getElementById('chatSettings'),
            settings: {}
        };

        // 初始化设置项元素
        ['carrier', 'networkType', 'battery', 'unreadCount', 'phoneTime', 'chatTitle']
            .forEach(id => {
                this.elements.settings[id] = document.getElementById(id);
            });
    }

    bindEvents() {
        this.elements.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.onTabChange?.(tabName);
            });
        });
    }

    updateTab(currentTab) {
        this.elements.tabs.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === currentTab);
        });

        if (this.elements.appearance) {
            this.elements.appearance.style.display = currentTab === 'appearance' ? 'block' : 'none';
        }
        if (this.elements.chat) {
            this.elements.chat.style.display = currentTab === 'chat' ? 'block' : 'none';
        }
    }

    setOnTabChange(callback) {
        this.onTabChange = callback;
    }
}