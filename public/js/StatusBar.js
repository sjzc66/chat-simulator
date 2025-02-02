class StatusBar {
    constructor(container) {
        this.container = container;
        this.elements = {
            time: container.querySelector('.time'),
            carrier: container.querySelector('.carrier-text'),
            battery: container.querySelector('.battery-text'),
            network: container.querySelector('.network-icon')
        };
    }

    update(state) {
        this.updateTime(state.phoneTime);
        this.updateCarrier(state.carrier);
        this.updateBattery(state.battery);
        this.updateNetwork(state.networkType);
    }

    updateNetwork(type) {
        if (this.elements.network) {
            const networkType = type.toLowerCase();
            if (networkType === 'wifi') {
                this.elements.network.innerHTML = Icons.wifi();
            } else {
                this.elements.network.innerHTML = Icons.signal();
            }
        }
    }

    getWifiSvg() {
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2c-3.1 0-5.9 1-8 2.7l.8.8C3 4 5.4 3 8 3s5 1 7.2 2.5l.8-.8C13.9 3 11.1 2 8 2z" fill="white"/>
            <path d="M8 5c-2.3 0-4.3.7-6 2l.8.8C4.2 6.7 6 6 8 6s3.8.7 5.2 1.8l.8-.8c-1.7-1.3-3.7-2-6-2z" fill="white"/>
            <path d="M8 8c-1.5 0-2.8.5-3.9 1.3l3.9 3.9 3.9-3.9C10.8 8.5 9.5 8 8 8z" fill="white"/>
        </svg>`;
    }

    get5GSvg() {
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g transform="translate(1, 3)">
                <rect x="0" y="8" width="1" height="4" fill="white"/>
                <rect x="3" y="6" width="1" height="6" fill="white"/>
                <rect x="6" y="4" width="1" height="8" fill="white"/>
                <rect x="9" y="2" width="1" height="10" fill="white"/>
                <rect x="12" y="0" width="1" height="12" fill="white"/>
            </g>
        </svg>`;
    }

    get4GSvg() {
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g transform="translate(1, 3)">
                <rect x="0" y="8" width="1" height="4" fill="white"/>
                <rect x="3" y="6" width="1" height="6" fill="white"/>
                <rect x="6" y="4" width="1" height="8" fill="white"/>
                <rect x="9" y="2" width="1" height="10" fill="white"/>
                <rect x="12" y="0" width="1" height="12" fill="white"/>
            </g>
        </svg>`;
    }

    updateTime(time) {
        if (this.elements.time) {
            this.elements.time.textContent = time;
        }
    }

    updateCarrier(carrier) {
        if (this.elements.carrier) {
            this.elements.carrier.textContent = carrier;
        }
    }

    updateBattery(battery) {
        if (this.elements.battery) {
            this.elements.battery.textContent = `${battery}%`;
        }
    }
}