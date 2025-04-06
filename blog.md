---
layout: default
title: Article Archive
body_class: blog-listing-page
permalink: /blog/
---

<div class="blog-container">
  <h1>Articles</h1>
  <hr>

  {% comment %} 使用 CSS Grid 或 Flexbox 佈局的容器 {% endcomment %}
  <div class="blog-posts blog-grid"> <!-- 添加一個額外的 class 'blog-grid' 用於佈局 -->

    {% if site.posts.size > 0 %}
      {% for post in site.posts %}
        <div class="blog-post card"> <!-- 單個文章的容器，添加 'card' class -->

          {% comment %} 特色圖片放在卡片頂部 {% endcomment %}
          {% if post.image %}
            <a href="{{ post.url | relative_url }}"> <!-- 讓圖片也能點擊 -->
              <img src="{{ post.image | relative_url }}" alt="{{ post.title | escape }} featured image" class="post-image" loading="lazy">
            </a>
          {% endif %}

          {% comment %} 包裹文字內容的容器 {% endcomment %}
          <div class="post-content">
            <h2 class="post-title">
              <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
            </h2>
            <p class="post-excerpt">
              {{ post.excerpt | strip_html | normalize_whitespace | truncate: 100 }} <!-- 摘要可以再短一點 -->
            </p>
          </div>

        </div> <!-- 結束 .blog-post.card -->
      {% endfor %}
    {% else %}
      <p>這裡還沒有文章。</p>
    {% endif %}

  </div> <!-- 結束 .blog-posts.blog-grid -->

</div> <!-- 結束 .blog-container -->