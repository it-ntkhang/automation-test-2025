import axios from "axios";
import * as cheerio from "cheerio";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

const url = "https://playwright.dev/docs/writing-tests";

async function scrapeAndSave(url) {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const content = $("main").text(); // lấy nội dung chính

  // Tạo thư mục docs nếu chưa tồn tại
  if (!existsSync("docs")) {
    mkdirSync("docs", { recursive: true });
  }

  const filePath = path.join("docs", "playwright_intro.txt");
  writeFileSync(filePath, content, "utf8");
  console.log("✅ Đã lưu nội dung vào:", filePath);
}

scrapeAndSave(url).catch(console.error);