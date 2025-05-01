# Liao Chen Ching Photography

This repository contains the source code for my personal photography portfolio website.

**Live Site:** [https://ralphliao.xyz](https://ralphliao.xyz)

## 關於此網站 (About This Site)

這個網站用於展示我的攝影作品。它使用靜態網站生成器 [Jekyll](https://jekyllrb.com/) 和 [Alembic](https://github.com/daviddarnes/alembic) 佈景主題建置，並部署在 [Vercel](https://vercel.com/) 上。

## 技術棧 (Technology Stack)

*   **靜態網站生成器:** Jekyll (`~> 3.9`)
*   **佈景主題:** Alembic
*   **樣式:** Sass
*   **部署平台:** Vercel
*   **(可選) 內容管理:** Netlify CMS / Decap CMS (如果您有使用)

## 本地開發 (Development)

若要在本地端執行此專案：

1.  **環境準備:**
    *   安裝 Ruby (版本需符合 Jekyll 要求，可參考 `.ruby-version` 檔案若存在)
    *   安裝 Bundler (`gem install bundler`)
2.  **複製儲存庫:**
    ```bash
    git clone https://github.com/polarskr/Liao_chen_ching_Photography.git
    cd Liao_chen_ching_Photography
    ```
3.  **安裝依賴:**
    ```bash
    bundle install
    ```
4.  **啟動開發伺服器:**
    ```bash
    bundle exec jekyll serve --livereload
    ```
    網站將運行在 `http://localhost:4000`。

---

*歡迎前往線上網站瀏覽我的作品！*
