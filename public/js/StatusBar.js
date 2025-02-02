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

    getBatteryIcon() {
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="4" width="12" height="8" rx="1" stroke="currentColor" fill="none"/>
            <rect x="13" y="6" width="2" height="4" rx="0.5" fill="currentColor"/>
            <rect x="2" y="5" width="10" height="6" fill="currentColor"/>
        </svg>`;
    }

    initIcons() {
        if (this.networkIcon) {
            this.networkIcon.innerHTML = this.getNetworkIcon('Wifi');
        }
        if (this.batteryIcon) {
            this.batteryIcon.innerHTML = this.getBatteryIcon();
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