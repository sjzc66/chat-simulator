class StatusBar {
    constructor(element) {
        this.element = element;
        this.initElements();
        this.initIcons();
    }

    initElements() {
        this.timeElement = this.element.querySelector('.time');
        this.carrierElement = this.element.querySelector('.carrier-text');
        this.networkIcon = this.element.querySelector('.network-icon');
        this.batteryText = this.element.querySelector('.battery-text');
        this.batteryIcon = this.element.querySelector('.battery-icon');
    }

    getNetworkIcon(type) {
        const icons = {
            'Wifi': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-2.5-4a4 4 0 0 1 5 0l1-1a5.5 5.5 0 0 0-7 0l1 1zm-2-2a7 7 0 0 1 9 0l1-1a8.5 8.5 0 0 0-11 0l1 1z" fill="currentColor"/>
            </svg>`,
            '5G': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 14h2V8H2v6zm3 0h2V6H5v8zm3 0h2V4H8v10zm3 0h2V2h-2v12z" fill="currentColor"/>
            </svg>`,
            '4G': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 14h2V8H2v6zm3 0h2V6H5v8zm3 0h2V4H8v10zm3 0h2V2h-2v12z" fill="currentColor"/>
            </svg>`
        };
        return icons[type] || icons['Wifi'];
    }

    initIcons() {
        // 电池图标
        if (this.batteryIcon) {
            this.batteryIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 6h10v4H2V6zm11 1h1v2h-1V7zM1 5v6h12V5H1zm13 2v2h2V7h-2z" fill="currentColor"/>
            </svg>`;
        }
    }

    update(state) {
        if (!state) return;

        // 更新时间
        if (this.timeElement && state.phoneTime) {
            this.timeElement.textContent = state.phoneTime;
        }

        // 更新运营商
        if (this.carrierElement && state.carrier) {
            this.carrierElement.textContent = state.carrier;
        }

        // 更新网络图标
        if (this.networkIcon && state.networkType) {
            this.networkIcon.innerHTML = this.getNetworkIcon(state.networkType);
        }

        // 更新电池百分比
        if (this.batteryText && state.battery) {
            this.batteryText.textContent = `${state.battery}%`;
        }
    }
}