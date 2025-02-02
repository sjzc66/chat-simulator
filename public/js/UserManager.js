class UserManager {
    constructor() {
        this.users = [];
        this.currentUser = null;
        this.baseURL = window.location.hostname === 'localhost' ? '' : '/chat-simulator';
        this.initAvatarUpload();
    }

    initAvatarUpload() {
        const avatarInput = document.getElementById('avatarInput');
        const uploadBtn = document.querySelector('.upload-btn');

        if (uploadBtn && avatarInput) {
            uploadBtn.addEventListener('click', () => avatarInput.click());
            avatarInput.addEventListener('change', (e) => this.handleAvatarChange(e));
        }
    }

    handleAvatarChange(event) {
        const file = event.target.files[0];
        if (!file || !this.currentUser) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // 增加 canvas 尺寸以提高清晰度
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const displaySize = 35;  // 显示尺寸
                const canvasSize = displaySize * 2;  // 画布尺寸翻倍以提高清晰度
                canvas.width = canvasSize;
                canvas.height = canvasSize;

                // 计算裁切区域
                let sx, sy, sWidth, sHeight;
                if (img.width > img.height) {
                    sHeight = img.height;
                    sWidth = sHeight;
                    sx = (img.width - sHeight) / 2;
                    sy = 0;
                } else {
                    sWidth = img.width;
                    sHeight = sWidth;
                    sx = 0;
                    sy = (img.height - sWidth) / 2;
                }

                // 优化绘制质量
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                
                // 绘制裁切后的图片
                ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasSize, canvasSize);

                // 使用更高质量的压缩
                // 更新当前用户头像
                this.currentUser.avatar = canvas.toDataURL('image/jpeg', 1.0);
                
                // 直接触发 UI 更新
                this.onUserUpdate?.(this.currentUser);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    addDefaultUsers() {
        const admin = {
            id: Date.now(),
            name: '本人',
            isAdmin: true,
            avatar: window.location.hostname === 'localhost' 
                ? '/resources/avatars/avatar_1.svg'
                : '/chat-simulator/resources/avatars/avatar_1.svg'
        };
        
        const otherUser = {
            id: Date.now() + 1,
            name: '其他人',
            isAdmin: false,
            avatar: window.location.hostname === 'localhost'
                ? '/resources/avatars/avatar_2.svg'
                : '/chat-simulator/resources/avatars/avatar_2.svg'
        };

        this.users = [admin, otherUser];
        this.currentUser = admin;
    }

    addUser() {
        const user = {
            id: Date.now(),
            name: `用户${this.users.length + 1}`,
            isAdmin: false,
            avatar: `${this.baseURL}/resources/avatars/avatar_${Math.floor(Math.random() * 20) + 1}.svg`
        };
        
        this.users.push(user);
        this.currentUser = user;
        return user;
    }

    renderUserList(container, onUserSelect) {
        const userList = document.createElement('div');
        userList.className = 'user-list';
        userList.innerHTML = `
            <h3>当前用户列表：</h3>
            ${this.users.map(user => `
                <div class="user-item ${user.id === this.currentUser?.id ? 'active' : ''}" 
                     data-user-id="${user.id}">
                    <img src="${user.avatar}" alt="头像" class="user-avatar">
                    <span>${user.name}</span>
                    <span>${user.isAdmin ? '(主人)' : ''}</span>
                </div>
            `).join('')}
        `;

        userList.querySelectorAll('.user-item').forEach(item => {
            item.addEventListener('click', () => {
                const userId = parseInt(item.dataset.userId);
                this.currentUser = this.users.find(u => u.id === userId);
                onUserSelect?.(this.currentUser);
            });
        });

        return userList;
    }
}