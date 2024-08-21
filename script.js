// 當 DOM 內容加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 獲取頁面上的重要元素
    const blogPostsContainer = document.getElementById('blogPosts');
    const loadingElement = document.getElementById('loading');
    const fullPostElement = document.getElementById('fullPost');

    // 加載博客文章的函數
    function loadBlogPosts() {
        console.log('Attempting to fetch posts...');
        // 從後端 API 獲取文章列表
        fetch('http://localhost:3000/api/posts')
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(posts => {
                console.log('Received posts:', posts);
                displayPosts(posts);  // 顯示獲取到的文章
            })
            .catch(error => {
                console.error('Error:', error);
                loadingElement.textContent = 'Error loading posts. Please try again later.';
            });
    }

    // 顯示文章列表的函數
    function displayPosts(posts) {
        loadingElement.style.display = 'none';  // 隱藏加載提示
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = '<p>No blog posts yet.</p>';
        } else {
            blogPostsContainer.innerHTML = '';
            // 遍歷文章列表,為每篇文章創建 HTML 結構
            posts.forEach(post => {
                const postHTML = `
                    <article class="post-preview">
                        <h2 class="post-title"><a href="#" onclick="showFullPost(${post.id})">${post.title}</a></h2>
                        <p class="post-meta">
                            Posted on ${post.date} | Category: ${post.category}
                        </p>
                        <p class="post-excerpt">${post.content.substring(0, 150)}...</p>
                        <a href="#" class="read-more" onclick="showFullPost(${post.id})">Read More</a>
                    </article>
                `;
                blogPostsContainer.innerHTML += postHTML;
            });
        }
    }

    // 顯示完整文章的函數 (定義為全局函數以便 HTML 中調用)
    window.showFullPost = function(postId) {
        // 從後端 API 獲取特定文章的詳細信息
        fetch(`http://localhost:3000/api/posts/${postId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(post => {
                // 顯示完整文章內容
                fullPostElement.innerHTML = `
                    <span class="close-btn" onclick="closeFullPost()">&times;</span>
                    <h2>${post.title}</h2>
                    <p class="post-meta">Posted on ${post.date} | Category: ${post.category}</p>
                    <div class="post-content">${post.content}</div>
                `;
                fullPostElement.style.display = 'block';  // 顯示完整文章
                blogPostsContainer.style.display = 'none';  // 隱藏文章列表
            })
            .catch(error => {
                console.error('Error loading full post:', error);
                fullPostElement.innerHTML = 'Error loading post. Please try again later.';
            });
    }

    // 關閉完整文章視圖的函數 (定義為全局函數以便 HTML 中調用)
    window.closeFullPost = function() {
        fullPostElement.style.display = 'none';  // 隱藏完整文章
        blogPostsContainer.style.display = 'block';  // 顯示文章列表
    }

    // 頁面加載時立即調用加載文章函數
    loadBlogPosts();
});