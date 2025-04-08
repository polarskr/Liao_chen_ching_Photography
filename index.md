---
layout: default
title: 首頁 | Liao ChenChing Photography & Insights 
description: 探索攝影師 Liao ChenChing (Ralph Liao) 的精選作品集，並一窺他對美學、投資及多元生活的獨特見解與最新文章。
---


<!-- ----- 開始：PP Mobler 風格圖片滑塊 ----- -->
<div class="image-slider pp-slider">

  <div class="slider-images">

    <img src="{{ "/assets/images/main img/denmark_museum.webp" | relative_url }}" alt="Denmark Museum" class="slider-image active" data-slide-index="0" loading="lazy">
    <img src="{{ "/assets/images/main img/Sea.webp" | relative_url }}" alt="Sea View" class="slider-image" data-slide-index="1" loading="lazy">
    <img src="{{ "/assets/images/main img/Blossom.webp" | relative_url }}" alt="Cherry Blossom" class="slider-image" data-slide-index="2" loading="lazy">
    <img src="{{ "/assets/images/main img/Chair.webp" | relative_url }}" alt="Modern Chair" class="slider-image" data-slide-index="3" loading="lazy">
    <!--
      <img src="{{ "/assets/images/main img/your_fifth_image.jpg" | relative_url }}" alt="Description" class="slider-image" data-slide-index="4" loading="lazy">
    -->
  </div>

  <div class="slider-dots pp-dots">
    <!--
      - 第一個按鈕默認添加 'active' class
      - 為每個按鈕添加 data-slide-index，與對應圖片匹配
      - 按鈕數量必須與圖片數量一致
    -->
    <button class="slider-dot active" data-slide-index="0" aria-label="Go to slide 1"></button>
    <button class="slider-dot" data-slide-index="1" aria-label="Go to slide 2"></button>
    <button class="slider-dot" data-slide-index="2" aria-label="Go to slide 3"></button>
    <button class="slider-dot" data-slide-index="3" aria-label="Go to slide 4"></button>
    <!--
      <button class="slider-dot" data-slide-index="4" aria-label="Go to slide 5"></button>
      如果添加了圖片，也要對應添加按鈕
    -->
  </div>

</div>
<!-- ----- 結束：PP Mobler 風格圖片滑塊 ----- -->


<section class="featured-grid pp-precise-grid">

  <!-- 主網格容器，將包含左右兩列 -->
  <div class="grid-main-container">
    
  <a href="{{ "/2023.html" | relative_url }}" class="grid-item grid-item-large">
      <img src="{{ "/assets/images/grid/De_Famila.webp" | relative_url }}" alt="2023 Gallery / 2023" class="grid-item-image" loading="lazy">
      <span class="grid-item-label">2023 Gallery</span>
  </a>
    
  <div class="grid-column-right">


  <a href="/blog.html" class="grid-item grid-item-stacked"> 
        <img src="{{ "/assets/images/grid/DSC02213.webp" | relative_url }}" alt="Article" class="grid-item-image" loading="lazy">
        <span class="grid-item-label">Article</span>
      </a>


  <a href="/about.html" class="grid-item grid-item-stacked"> 
        <img src="{{ "/assets/images/grid/DSC03555.webp" | relative_url }}" alt="About" class="grid-item-image" loading="lazy"> 
        <span class="grid-item-label">About</span>
      </a>

  <a href="#" class="grid-item grid-item-stacked"> 
        <img src="{{ "/assets/images/grid/collection-image.webp" | relative_url }}" alt="Collection" class="grid-item-image" loading="lazy">
        <span class="grid-item-label">Collection</span> 
      </a>


  </div> 

  </div> 

</section>
