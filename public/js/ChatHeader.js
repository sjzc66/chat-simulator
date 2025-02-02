class ChatHeader {
    constructor(container) {
        this.container = container;
        this.elements = {
            title: container.querySelector('.title'),
            unreadCount: container.querySelector('.unread-count'),
            backIcon: container.querySelector('.back-icon')
        };

        // 初始化返回箭头
        if (this.elements.backIcon) {
            this.elements.backIcon.innerHTML = Icons.back();
        }
    }

    update(state) {
        this.updateTitle(state.chatTitle);
        this.updateUnreadCount(state.unreadCount);
    }

    updateTitle(title) {
        if (this.elements.title) {
            this.elements.title.textContent = title;
        }
    }

    updateUnreadCount(count) {
        if (this.elements.unreadCount) {
            this.elements.unreadCount.textContent = count;
        }
    }
}