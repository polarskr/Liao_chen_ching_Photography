---
layout: page 
title: Contact me
---

<!-- 直接從舊 contact.html 複製過來的表單 HTML -->
<!-- 注意：表單的 action 和 hidden input 用於 formsubmit.co，必須保留 -->
<div class="contact-form">
  <h2>Contact Us</h2>
  <form action="https://formsubmit.co/38518874a@gmail.com" method="post">

    <!-- Formsubmit.co 設定 -->
    <!-- !! 確保修改 _redirect value 為你的實際感謝頁面網址 !! -->
    <input type="hidden" name="_redirect" value="https://ralphliao.xyz/thank-you/"> 
    <input type="hidden" name="_subject" value="New submission from ralphliao.xyz!" />
    <!-- 其他 _cc, _bcc 等根據需要保留或移除 -->
    <!-- <input type="hidden" name="_cc" value="cc-email@example.com" /> -->
    <!-- <input type="hidden" name="_bcc" value="bcc-email@example.com" /> -->

    <!-- 表單欄位 -->
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required />

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required />

    <label for="subject">Subject:</label>
    <input type="text" id="subject" name="subject" required />

    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" required></textarea>

    <button type="submit">Send</button>
  </form>
</div>