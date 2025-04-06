---
layout: default # 指定使用 _layouts/default.html 作為基礎模板
title: Home # 頁面標題 (會顯示在瀏覽器分頁)
# 你可以根據需要取消註解 main_class
# main_class: homepage-content
---


<!-- ----- 開始：PP Mobler 風格圖片滑塊 ----- -->
<div class="image-slider pp-slider">

  <div class="slider-images">
    <!--
      - 使用你原來的圖片作為前幾張幻燈片
      - 第一張圖片默認添加 'active' class
      - 為每張圖片添加 data-slide-index (從 0 開始)
      - !! 請確保這些圖片文件存在於你的項目中 !!
    -->
    <img src="{{ "/assets/images/main img/denmark_museum.webp" | relative_url }}" alt="Denmark Museum" class="slider-image active" data-slide-index="0" loading="lazy">
    <img src="{{ "/assets/images/main img/Sea.webp" | relative_url }}" alt="Sea View" class="slider-image" data-slide-index="1" loading="lazy">
    <img src="{{ "/assets/images/main img/Blossom.webp" | relative_url }}" alt="Cherry Blossom" class="slider-image" data-slide-index="2" loading="lazy">
    <img src="{{ "/assets/images/main img/Chair.webp" | relative_url }}" alt="Modern Chair" class="slider-image" data-slide-index="3" loading="lazy">
    <!--
      <img src="{{ "/assets/images/main img/your_fifth_image.jpg" | relative_url }}" alt="Description" class="slider-image" data-slide-index="4" loading="lazy">
      如果需要，繼續添加更多圖片
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

<!-- ----- 開始：PP Møbler 精確風格特色網格 ----- -->
<section class="featured-grid pp-precise-grid">

  <!-- 主網格容器，將包含左右兩列 -->
  <div class="grid-main-container">

    <!-- 左側大項目 (佔據第一列) -->
    <a href="{{ "/2023/" | relative_url }}" class="grid-item grid-item-large">
      <img src="{{ "/assets/images/grid/De_Famila.webp" | relative_url }}" alt="2023 Gallery / 2023" class="grid-item-image" loading="lazy">
      <span class="grid-item-label">2023 Gallery</span> <!-- 修改為你想要的標籤文字 -->
    </a>

    <!-- 右側列容器 (佔據第二列) -->
    <div class="grid-column-right">

      <!-- 右側第一個項目 (堆疊) -->
      <a href="/blog/" class="grid-item grid-item-stacked"> 
        <img src="{{ "/assets/images/grid/DSC02213.webp" | relative_url }}" alt="Article" class="grid-item-image" loading="lazy">
        <span class="grid-item-label">Article</span>
      </a>

      <!-- 右側第二個項目 (堆疊) -->
      <a href="/about/" class="grid-item grid-item-stacked"> 
        <img src="{{ "/assets/images/grid/DSC03555.webp" | relative_url }}" alt="About" class="grid-item-image" loading="lazy"> 
        <span class="grid-item-label">About</span>
      </a>

      <!-- 右側第三個項目 (堆疊) -->
      <a href="#" class="grid-item grid-item-stacked"> 
        <img src="{{ "/assets/images/grid/collection-image.jpg" | relative_url }}" alt="Collection" class="grid-item-image" loading="lazy">
        <span class="grid-item-label">Collection</span> 
      </a>

      <!-- 如果右側需要更多項目，繼續在這裡添加 -->

    </div> <!-- 結束右側列容器 -->

  </div> <!-- 結束主網格容器 -->

</section>
<!-- ----- 結束：PP Møbler 精確風格特色網格 ----- -->