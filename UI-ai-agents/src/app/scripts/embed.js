import { readFileSync, writeFileSync } from "fs";
import path from "path";

const content = readFileSync(path.join("docs", "playwright_intro.txt"), "utf8");

// Tạm thời chỉ lưu vào JSON, bạn có thể thay thế bằng vector DB sau
writeFileSync("docs/knowledge.json", JSON.stringify({ content }), "utf8");
console.log("✅ Đã lưu kiến thức vào knowledge.json");
