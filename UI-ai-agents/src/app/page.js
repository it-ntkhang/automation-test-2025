"use client";
import { useState } from "react";

export default function Home() {
  const [feature, setFeature] = useState("");
  const [testCase, setTestCase] = useState("");
  const [playwrightScript, setPlaywrightScript] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const generateTestCase = async () => {
    if (!feature) {
      setMessage("Vui lòng nhập mô tả tính năng.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("Đang tạo test case...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          feature,
          testType: "Kiểm thử chức năng" 
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setTestCase(data.testCase || "{}");
      setMessage("Test case đã được tạo!");
      setStep(2);
    } catch (error) {
      setMessage("Lỗi: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePlaywrightScript = async () => {
    if (!testCase) {
      setMessage("Vui lòng tạo test case trước.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("Đang tạo script...");
      const response = await fetch("/api/generateScript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testCases: testCase }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setPlaywrightScript(data.script || "");
      setMessage("Script đã được tạo!");
      setStep(3);
    } catch (error) {
      setMessage("Lỗi: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const runTest = async () => {
    if (!playwrightScript) {
      setMessage("Vui lòng tạo script trước.");
      return;
    }
    
    try {
      setIsLoading(true);
      setMessage("Đang chạy test...");
      const response = await fetch("/api/runTest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: playwrightScript }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessage(data.message || data.result || "Test đã chạy thành công!");
    } catch (error) {
      setMessage("Lỗi: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-8">AI Test Case Generator</h1>
      
      {/* Step 1: Generate Test Case */}
      <div className={`w-full max-w-2xl ${step !== 1 && 'hidden'}`}>
        <h2 className="text-xl mb-4">Step 1: Tạo Test Case</h2>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Nhập mô tả test case..."
          rows="4"
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
        />
        <button
          onClick={generateTestCase}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Đang tạo..." : "Tạo Test Case"}
        </button>
      </div>

      {/* Step 2: Edit Test Case */}
      <div className={`w-full max-w-2xl ${step !== 2 && 'hidden'}`}>
        <h2 className="text-xl mb-4">Step 2: Chỉnh sửa Test Case</h2>
        <textarea
          className="w-full p-2 border rounded"
          rows="10"
          value={testCase}
          onChange={(e) => setTestCase(e.target.value)}
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setStep(1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            disabled={isLoading}
          >
            Quay lại
          </button>
          <button
            onClick={generatePlaywrightScript}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Đang tạo..." : "Tạo Script"}
          </button>
        </div>
      </div>

      {/* Step 3: View and Run Script */}
      <div className={`w-full max-w-2xl ${step !== 3 && 'hidden'}`}>
        <h2 className="text-xl mb-4">Step 3: Chạy Script Test</h2>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
          {playwrightScript}
        </pre>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setStep(2)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            disabled={isLoading}
          >
            Quay lại
          </button>
          <button
            onClick={runTest}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Đang chạy..." : "Chạy Test"}
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mt-4 p-4 rounded shadow-md w-full max-w-xl ${message.includes("Lỗi") ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
          <div className="flex items-center justify-between">
            <span className="font-semibold">{message.includes("Lỗi") ? "Có lỗi xảy ra!" : "Hoàn tất!"}</span>
            <button
              className="text-white hover:text-gray-200"
              onClick={() => setMessage("")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}