document.addEventListener('DOMContentLoaded', function() {
    const blogPostsContainer = document.getElementById('blogPosts');
    const loadingElement = document.getElementById('loading');
    const fullPostElement = document.getElementById('fullPost');

    function loadBlogPosts() {
        console.log('Attempting to fetch posts...');
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
                displayPosts(posts);
            })
            .catch(error => {
                console.error('Error:', error);
                loadingElement.textContent = 'Error loading posts. Please try again later.';
            });
    }

    function displayPosts(posts) {
        loadingElement.style.display = 'none';
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = '<p>No blog posts yet.</p>';
        } else {
            blogPostsContainer.innerHTML = '';
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

    window.showFullPost = function(postId) {
        fetch(`http://localhost:3000/api/posts/${postId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(post => {
                fullPostElement.innerHTML = `
                    <span class="close-btn" onclick="closeFullPost()">&times;</span>
                    <h2>${post.title}</h2>
                    <p class="post-meta">Posted on ${post.date} | Category: ${post.category}</p>
                    <div class="post-content">${post.content}</div>
                `;
                fullPostElement.style.display = 'block';
                blogPostsContainer.style.display = 'none';
            })
            .catch(error => {
                console.error('Error loading full post:', error);
                fullPostElement.innerHTML = 'Error loading post. Please try again later.';
            });
    }

    window.closeFullPost = function() {
        fullPostElement.style.display = 'none';
        blogPostsContainer.style.display = 'block';
    }

    loadBlogPosts();
});