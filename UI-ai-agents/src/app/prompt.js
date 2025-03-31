// Tạo test case cơ bản cho tính năng
export const basicPrompt =
`
Bạn là chuyên gia kiểm thử tự động với Playwright.  
Hãy tạo test case cho **tính năng "{feature}"** với loại kiểm thử **{testType}**.

{
  "testCases": [
    {
      "testCaseID": "TC001",
      "title": "Tên test case",
      "description": "Mô tả chi tiết",
      "steps": [
        { "action": "navigate", "target": "URL" },
        { "action": "fill", "target": "selector", "value": "data" },
        { "action": "click", "target": "selector" },
        { "action": "expect", "target": "selector", "value": "expected result" }
      ]
    }
  ]
}

💡 Lưu ý:
- Chỉ trả về JSON, không có nội dung nào khác.
- Tạo test case dựa trên tính năng: **"{feature}"**
- Kiểm thử theo loại: **{testType}** (VD: Chức năng, UI, bảo mật, hiệu năng...)
- Lấy tài liệu từ https://playwright.dev/docs/

`

// Tạo test case chuyên sâu đầy đủ
export const allPrompt =
`
Bạn là chuyên gia kiểm thử phần mềm với Playwright Test.
Hãy tạo test case cho **tính năng "{feature}"** với loại kiểm thử **{testType}**.

📌 **Yêu cầu:**
1️⃣ **Tạo ít nhất 3 test case**, mỗi test case phải có ID duy nhất.
2️⃣ **Sử dụng các action Playwright phổ biến** như:
   - navigate, fill, click, expect
   - check, selectOption, waitFor, hover, press
3️⃣ **Test case cần có mô tả chi tiết**, không chỉ là bước thao tác.

📂 **Định dạng JSON:**
{
  "testCases": [
    {
      "testCaseID": "TC001",
      "title": "Tên test case",
      "description": "Mô tả chi tiết",
      "steps": [
        { "action": "navigate", "target": "https://example.com/login" },
        { "action": "fill", "target": "#username", "value": "user123" },
        { "action": "fill", "target": "#password", "value": "pass123" },
        { "action": "click", "target": "#login-btn" },
        { "action": "expect", "target": "#welcome-msg", "value": "Chào mừng bạn!" }
      ]
    }
  ]
}

💡 **Lưu ý quan trọng:**
- Đảm bảo test case **có thể chạy trên Playwright mà không bị lỗi**.
- Nếu có nhiều trường hợp, hãy tạo thêm test case với ID tăng dần.
- **Chỉ trả về JSON**, không có nội dung nào khác.

`

// // Tạo test case chống tấn công bảo mật
// const securityPrompts = 
// `Bạn là chuyên gia kiểm thử playwright testing bảo mật.  
// Hãy tạo test case kiểm tra **"{feature}"** để chống lại các cuộc tấn công phổ biến:

// 🚨 **Các loại tấn công cần kiểm thử:**
// 1️⃣ **SQL Injection** - Nhập ``"OR 1=1 --"`` vào ô input để kiểm tra bảo mật.
// 2️⃣ **XSS Attack** - Nhập ``<script>alert('XSS')</script>`` vào ô nhập liệu.
// 3️⃣ **Brute Force** - Thử nhiều mật khẩu khác nhau xem hệ thống có khóa tài khoản không.

// 📂 **Định dạng JSON**:
// {
//   "testCases": [
//     { "testCaseID": "TC001", "title": "SQL Injection", "description": "...", "steps": [...] },
//     { "testCaseID": "TC002", "title": "XSS Attack", "description": "...", "steps": [...] },
//     { "testCaseID": "TC003", "title": "Brute Force", "description": "...", "steps": [...] }
//   ]
// }

// 💡 **Lưu ý**:
// - Chỉ trả về JSON.
// - Đảm bảo test case có thể chạy trên Playwright.
// - Nếu hệ thống dễ bị tấn công, cần có cảnh báo.
// `

// // Tạo test case Kiểm tra trên nhiều thiết bị
// const viewPrompts =
// `
// Bạn là chuyên gia kiểm thử giao diện UI bằng Playwright.  
// Hãy tạo test case để kiểm tra tính năng **"{feature}"** trên các kích thước màn hình khác nhau:

// 📱 **Thiết bị cần kiểm thử**:
// 1️⃣ Mobile (iPhone 12)
// 2️⃣ Tablet (iPad Pro)
// 3️⃣ Desktop (1920x1080)

// 📂 **Định dạng JSON**:
// {
//   "testCases": [
//     { "testCaseID": "TC001", "title": "Kiểm tra giao diện trên iPhone 12", "viewport": "390x844", "steps": [...] },
//     { "testCaseID": "TC002", "title": "Kiểm tra giao diện trên iPad Pro", "viewport": "1024x1366", "steps": [...] },
//     { "testCaseID": "TC003", "title": "Kiểm tra giao diện trên Desktop", "viewport": "1920x1080", "steps": [...] }
//   ]
// }

// 💡 **Lưu ý**:
// - Sử dụng ``page.setViewportSize({ width, height })`` để kiểm thử UI.
// - Đảm bảo layout không bị vỡ trên mọi thiết bị.
// `

// // Tạo test case điều kiện test case phức tạp
// const specialedPrompts =
// `
// Bạn là chuyên gia automation testing.  
// Hãy tạo test case với các tình huống sau cho **"{feature}"**:

// 1️⃣ **Happy Path** - Kiểm thử tình huống lý tưởng.
// 2️⃣ **Negative Test** - Kiểm thử trường hợp lỗi hoặc ngoại lệ.
// 3️⃣ **Edge Case** - Kiểm thử trường hợp đặc biệt.

// 📂 **Định dạng JSON**:
// {
//   "testCases": [
//     { "testCaseID": "TC001", "title": "Happy Path", "description": "...", "steps": [...] },
//     { "testCaseID": "TC002", "title": "Negative Test", "description": "...", "steps": [...] },
//     { "testCaseID": "TC003", "title": "Edge Case", "description": "...", "steps": [...] }
//   ]
// }

// 💡 **Lưu ý**:
// - Chỉ trả về JSON, không có nội dung nào khác.
// - Hãy đảm bảo test case có thể chạy trên Playwright.
// `

// Hàm tiện ích để thay thế các biến trong prompt
export function formatPrompt(promptTemplate, variables) {
  let formattedPrompt = promptTemplate;
  for (const [key, value] of Object.entries(variables)) {
    formattedPrompt = formattedPrompt.replace(new RegExp(`{${key}}`, 'g'), value);
  }
  return formattedPrompt;
}