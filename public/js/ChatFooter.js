class ChatFooter {
  constructor() {
    // 根据环境设置路径前缀
    this.prefix = window.location.hostname === 'localhost' ? '' : '/chat-simulator';
    console.log('ChatFooter初始化, prefix:', this.prefix); // 调试日志
    this.init();
  }

  // 初始化方法
  init() {
    console.log('开始初始化底部图片'); // 调试日志
    const bottomImage = document.querySelector('.bottom-image');
    if (bottomImage) {
      const imagePath = 'resources/image/bottom.png';  // 移除开头的斜杠
      const fullPath = this.getPathWithPrefix(imagePath);
      console.log('图片完整路径:', fullPath); // 调试日志
      bottomImage.src = fullPath;
    } else {
      console.warn('未找到.bottom-image元素'); // 调试警告
    }
  }

  // 处理路径前缀
  getPathWithPrefix(path) {
    const result = this.prefix ? `${this.prefix}/${path}` : path;
    console.log('路径处理:', { 原始路径: path, 处理后路径: result }); // 调试日志
    return result;
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM加载完成，初始化ChatFooter'); // 调试日志
    new ChatFooter();
});