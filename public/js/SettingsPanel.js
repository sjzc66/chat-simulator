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
            settings: {},
            batteryValue: document.getElementById('batteryValue') // 添加电量值显示元素
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
        
        // 添加电量滑块事件监听
        if (this.elements.settings.battery) {
            this.elements.settings.battery.addEventListener('input', (e) => {
                const value = e.target.value;
                const percentage = (value / 100) * 100;
                e.target.style.background = `linear-gradient(to right, #007aff ${percentage}%, #e9e9e9 ${percentage}%)`;
                if (this.elements.batteryValue) {
                    this.elements.batteryValue.textContent = `${value}%`;
                }
            });
        
            // 初始化滑块颜色
            const initialValue = this.elements.settings.battery.value;
            const initialPercentage = (initialValue / 100) * 100;
            this.elements.settings.battery.style.background = `linear-gradient(to right, #007aff ${initialPercentage}%, #e9e9e9 ${initialPercentage}%)`;
        }
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