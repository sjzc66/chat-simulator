const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

// 配置文件上传
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 静态文件服务
app.use(express.static('public'));
app.use('/resources', express.static('resources'));
app.use('/uploads', express.static('uploads'));

// 处理文件上传
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: '没有文件上传' });
    }
    res.json({
        success: true,
        url: `/uploads/${req.file.filename}`
    });
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});