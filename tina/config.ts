import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "blog",
        label: "部落格文章",
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            ui: {
              component: null,
            },
          },
          {
            type: "string",
            name: "title",
            label: "標題",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "封面圖片 (Image)",
            required: false,
          },
          {
            type: "string",
            name: "description",
            label: "摘要 (Description) / Excerpt",
            required: false,
          },
          {
            type: "datetime",
            name: "date",
            label: "發布日期",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD HH:mm:ss Z",
            }
          },
          {
            type: "string",
            name: "categories",
            label: "分類",
            list: true,
            required: false,
          },
          {
            type: "string",
            name: "tags",
            label: "標籤",
            list: true,
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "內文",
            isBody: true,
          },
        ],
      },
      {
        name: "portfolio",
        label: "作品集項目",
        path: "src/content/portfolio",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "標題",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "主要圖片",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "分類",
            required: false,
          },
          {
            type: "datetime",
            name: "date",
            label: "日期",
            required: false,
            ui: {
              dateFormat: "YYYY-MM-DD",
            },
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            ui: {
              component: 'textarea',
            },
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "詳細說明 (可選)",
            isBody: true,
            required: false,
          },
        ],
      },

    ],
  },
});
