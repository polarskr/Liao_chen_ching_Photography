const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 模拟数据库
let posts = [
    {id: 1, title: "Test Post", content: "This is a test post.", date: "2024-01-01", category: "Test"}
];

// 获取所有文章
app.get('/api/posts', (req, res) => {
    console.log('Received request for all posts');
    res.json(posts);
});

// 获取单个文章
app.get('/api/posts/:id', (req, res) => {
    console.log(`Received request for post with id: ${req.params.id}`);
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// 创建新的博客文章
app.post('/api/posts', (req, res) => {
    console.log('Received request to create a new post');
    const { title, content, category } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        category,
        date: new Date().toISOString().split('T')[0]
    };
    posts.unshift(newPost);
    res.status(201).json(newPost);
});

// 更新文章
app.put('/api/posts/:id', (req, res) => {
    console.log(`Received request to update post with id: ${req.params.id}`);
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
        const { title, content, category } = req.body;
        posts[index] = { ...posts[index], title, content, category };
        res.json(posts[index]);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});