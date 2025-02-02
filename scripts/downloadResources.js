const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios');

const PROJECT_ROOT = path.join(__dirname, '..');
const RESOURCES_DIR = path.join(PROJECT_ROOT, 'resources');

// 创建必要的目录
const dirs = [
    path.join(RESOURCES_DIR, 'avatars'),
    path.join(RESOURCES_DIR, 'icons'),
    path.join(RESOURCES_DIR, 'emojis')
];

// 确保目录存在
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// 从 DiceBear API 获取随机头像
async function downloadAvatars(count = 20) {
    const styles = ['micah', 'personas', 'bottts', 'identicon'];
    
    for (let i = 0; i < count; i++) {
        const style = styles[Math.floor(Math.random() * styles.length)];
        const seed = Math.random().toString(36).substring(7);
        const url = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
        
        try {
            const response = await axios.get(url, { 
                responseType: 'arraybuffer',
                headers: {
                    'Accept': 'image/svg+xml'
                }
            });
            const filePath = path.join(RESOURCES_DIR, 'avatars', `avatar_${i + 1}.svg`);
            fs.writeFileSync(filePath, response.data);
            console.log(`Downloaded avatar ${i + 1}`);
        } catch (error) {
            console.error(`Failed to download avatar ${i + 1}:`, error.message);
        }
    }
}

// 从 OpenMoji 获取表情符号
async function downloadEmojis() {
    const emojiList = [
        { code: '1F600', name: 'grinning' },
        { code: '1F601', name: 'grin' },
        { code: '1F602', name: 'joy' },
        { code: '1F603', name: 'smile' },
        { code: '1F604', name: 'happy' },
        { code: '1F605', name: 'sweat_smile' },
        { code: '1F606', name: 'laughing' },
        { code: '1F607', name: 'innocent' },
        { code: '1F608', name: 'smiling_imp' },
        { code: '1F609', name: 'wink' }
    ];

    for (const emoji of emojiList) {
        try {
            const url = `https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/${emoji.code.toLowerCase()}.svg`;
            const response = await axios.get(url, { 
                responseType: 'arraybuffer',
                headers: {
                    'Accept': 'image/svg+xml'
                }
            });
            const filePath = path.join(RESOURCES_DIR, 'emojis', `emoji_${emoji.name}.svg`);
            fs.writeFileSync(filePath, response.data);
            console.log(`Downloaded emoji: ${emoji.name}`);
            
            // 添加延迟以避免请求过快
            await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
            console.error(`Failed to download emoji ${emoji.name}:`, error.message);
        }
    }
}

// 下载基本图标
async function downloadIcons() {
    const icons = {
        voice: 'https://raw.githubusercontent.com/primer/octicons/main/icons/unmute-16.svg',
        redPacket: 'https://raw.githubusercontent.com/primer/octicons/main/icons/gift-16.svg',
        transfer: 'https://raw.githubusercontent.com/primer/octicons/main/icons/credit-card-16.svg',
        image: 'https://raw.githubusercontent.com/primer/octicons/main/icons/image-16.svg'
    };

    for (const [name, url] of Object.entries(icons)) {
        try {
            const response = await axios.get(url, { 
                responseType: 'arraybuffer',
                headers: {
                    'Accept': 'image/svg+xml'
                }
            });
            const filePath = path.join(RESOURCES_DIR, 'icons', `${name}.svg`);
            fs.writeFileSync(filePath, response.data);
            console.log(`Downloaded icon: ${name}`);
        } catch (error) {
            console.error(`Failed to download icon ${name}:`, error.message);
        }
    }
}

// 生成随机用户名数据
function generateUsernames() {
    const adjectives = ['快乐', '可爱', '温柔', '善良', '聪明', '活泼', '开朗', '幽默', '文艺', '阳光'];
    const nouns = ['小猫', '小狗', '小兔', '小鸟', '小熊', '小鱼', '小象', '小鹿', '小狐狸', '小松鼠'];
    const suffixes = ['', '酱', '君', '大人', '小姐', '先生', '宝宝', '同学', '老师', '大神'];

    const usernames = [];
    for (let i = 0; i < 100; i++) {
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        usernames.push(adj + noun + suffix);
    }

    const filePath = path.join(RESOURCES_DIR, 'usernames.json');
    fs.writeFileSync(filePath, JSON.stringify(usernames, null, 2));
    console.log('Generated usernames');
}

// 下载基本图标
async function downloadIcons() {
    const icons = {
        voice: 'https://img.icons8.com/material-outlined/96/000000/microphone.png',
        redPacket: 'https://img.icons8.com/material-outlined/96/000000/envelope.png',
        transfer: 'https://img.icons8.com/material-outlined/96/000000/money-transfer.png',
        image: 'https://img.icons8.com/material-outlined/96/000000/image.png'
    };

    for (const [name, url] of Object.entries(icons)) {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const filePath = path.join(RESOURCES_DIR, 'icons', `${name}.png`);
            fs.writeFileSync(filePath, response.data);
            console.log(`Downloaded icon: ${name}`);
        } catch (error) {
            console.error(`Failed to download icon: ${name}`);
        }
    }
}

// 主函数
async function main() {
    try {
        console.log('开始下载资源...');
        await downloadAvatars();
        await downloadEmojis();
        await downloadIcons();
        generateUsernames();
        console.log('资源下载完成！');
    } catch (error) {
        console.error('下载过程中出错：', error);
    }
}

// 运行脚本
main();