const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// 模拟数据库
let posts = [
    {id: 1, title: "Test Post", content: "This is a test post.", date: "2024-01-01"}
];

// 获取所有文章
app.get('/api/posts', (req, res) => {
    res.json(posts.map(post => ({ id: post.id, title: post.title })));
});

// 获取单个文章
app.get('/api/posts/:id', (req, res) => {
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
    const { title, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        date: new Date().toISOString().split('T')[0]
    };
    posts.unshift(newPost);
    res.status(201).json(newPost);
});

// 更新文章
app.put('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
        const { title, content } = req.body;
        posts[index] = { ...posts[index], title, content };
        res.json(posts[index]);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

fetch('http://localhost:3000/api/posts')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(posts => {
        if (posts.length === 0) {
            errorMessage.textContent = 'No posts available.';
            return;
        }
        posts.forEach(post => {
            const option = document.createElement('option');
            option.value = post.id;
            option.textContent = post.title;
            postSelector.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'Error loading posts. Please try again later.';
    });