// 引入必要的模塊
const express = require('express');  // Express 框架
const cors = require('cors');        // 跨域資源共享中間件
const app = express();               // 創建 Express 應用
const port = 3000;                   // 設置服務器端口

// 使用中間件
app.use(cors());                     // 啟用 CORS
app.use(express.json());             // 解析 JSON 格式的請求體

// 模擬數據庫
// 在實際應用中,這裡通常會連接到真實的數據庫
let posts = [
    {id: 1, title: "Test Post", content: "This is a test post.", date: "2024-01-01", category: "Test"}
];

// 定義路由: 獲取所有文章
app.get('/api/posts', (req, res) => {
    console.log('Received request for all posts');
    res.json(posts);  // 返回所有文章
});

// 定義路由: 獲取單個文章
app.get('/api/posts/:id', (req, res) => {
    console.log(`Received request for post with id: ${req.params.id}`);
    const id = parseInt(req.params.id);  // 將 id 轉換為整數
    const post = posts.find(p => p.id === id);  // 查找指定 id 的文章
    if (post) {
        res.json(post);  // 如果找到,返回該文章
    } else {
        res.status(404).json({ message: "Post not found" });  // 如果未找到,返回 404 錯誤
    }
});

// 定義路由: 創建新的博客文章
app.post('/api/posts', (req, res) => {
    console.log('Received request to create a new post');
    const { title, content, category } = req.body;  // 從請求體中解構所需數據
    const newPost = {
        id: posts.length + 1,  // 生成新的 id
        title,
        content,
        category,
        date: new Date().toISOString().split('T')[0]  // 設置當前日期
    };
    posts.unshift(newPost);  // 將新文章添加到數組開頭
    res.status(201).json(newPost);  // 返回新創建的文章,狀態碼 201
});

// 定義路由: 更新文章
app.put('/api/posts/:id', (req, res) => {
    console.log(`Received request to update post with id: ${req.params.id}`);
    const id = parseInt(req.params.id);  // 將 id 轉換為整數
    const index = posts.findIndex(p => p.id === id);  // 查找文章索引
    if (index !== -1) {  // 如果找到文章
        const { title, content, category } = req.body;  // 從請求體中解構更新數據
        posts[index] = { ...posts[index], title, content, category };  // 更新文章
        res.json(posts[index]);  // 返回更新後的文章
    } else {
        res.status(404).json({ message: "Post not found" });  // 如果未找到,返回 404 錯誤
    }
});

// 啟動服務器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});