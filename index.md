---
layout: default # 指定使用 _layouts/default.html 作為基礎模板
title: Home # 頁面標題 (會顯示在瀏覽器分頁)
# 如果你的首頁 gallery 需要特定的 grid class 加在 <main> 元素上
# main_class: content-grid--auto-fit # 取消註解並換成你定義的 class (如果需要)
---

<div class="intro-word">
  <h2>Ralph is a super cool guy! He skates, he plays guitar, he also fixes guitars! WOW! Amazing!</h2>
</div>

<div class="gallery">
  <img src="{{ "/assets/images/main img/denmark_museum.webp" | relative_url }}" alt="Denmark" loading="lazy">
  <img src="{{ "/assets/images/main img/Sea.webp" | relative_url }}" alt="Sea" loading="lazy">
  <img src="{{ "/assets/images/main img/Blossom.webp" | relative_url }}" alt="Blossom" loading="lazy">
  <img src="{{ "/assets/images/main img/Chair.webp" | relative_url }}" alt="Chair" loading="lazy">
</div>