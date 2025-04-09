import { writeFileSync, readFileSync } from "fs";
import OpenAI from "openai";
import { NextResponse } from 'next/server';
import { basicPrompt, formatPrompt } from '../../prompts/prompt';

function createLLMClient(baseURL = "http://localhost:11434/v1", apiKey = "test") {
  return new OpenAI({ baseURL, apiKey });
}

function extractJSON(content) {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Không tìm thấy JSON trong phản hồi AI.");
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Lỗi trích xuất JSON:', error);
    throw new Error('Không thể trích xuất JSON từ phản hồi AI.');
  }
}

export async function POST(request) {
  try {
    const { feature, testType = "Kiểm thử chức năng" } = await request.json();

    // Sử dụng prompt từ file prompt.js
    const prompt = formatPrompt(basicPrompt, { feature, testType });
    const knowledge = JSON.parse(readFileSync("docs/knowledge.json", "utf8")).content;

    const fullPrompt = `
      Hướng dẫn: Dưới đây là tài liệu hệ thống:\n${knowledge}\n
      Câu hỏi: Dựa vào tài liệu trên, hãy viết test case Playwright cho tình huống: ${prompt}
      Kết quả:`;

    const openAIClient = createLLMClient();
    const completion = await openAIClient.chat.completions.create({
      messages: [{ role: "system", content: fullPrompt }],
      model: "gemma3:1b",
      temperature: 0.5,
    });

    const testCase = completion.choices[0].message.content.trim();
    const testCases = extractJSON(testCase);

    // Use try-catch for file operations
    try {
      writeFileSync("ai_testcase.json", JSON.stringify(testCases, null, 2));
    } catch (fileError) {
      console.error('Warning: Could not write to file', fileError);
      // Continue execution even if file write fails
    }

    return NextResponse.json({
      message: "Test cases generated successfully",
      testCase: JSON.stringify(testCases, null, 2)
    });

  } catch (error) {
    console.error('Lỗi khi xử lý API generate:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}