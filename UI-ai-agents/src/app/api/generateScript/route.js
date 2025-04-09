import { writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {

        const body = await request.json();

        
        const rawTestCases = body.testCases || body;

        
        const testCases = parseTestCases(rawTestCases);

        
        const playwrightScript = generatePlaywrightScript(testCases);
        
        // Save script to file with try-catch
        try {
            writeFileSync("./ai_test.spec.js", playwrightScript);
        } catch (fileError) {
            console.error('Warning: Could not write to file', fileError);
            // Continue execution even if file write fails
        }

        return NextResponse.json({ script: playwrightScript });
    } catch (error) {
        console.error('Error generating script:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}

function parseTestCases(testCases) {

    
    // Kiểm tra nếu là undefined hoặc null
    if (!testCases) {
        throw new Error("testCases is required");
    }

    // Nếu là string, thử parse thành JSON
    if (typeof testCases === "string") {
        try {
            const parsedData = JSON.parse(testCases);
            testCases = parsedData.testCases || parsedData;
        } catch (error) {
            console.error("JSON parse error:", error);
            throw new Error("Invalid JSON format for testCases");
        }
    }

    // Nếu là object nhưng không phải array, kiểm tra xem có thuộc tính testCases không
    if (typeof testCases === "object" && !Array.isArray(testCases)) {

        if (testCases.testCases) {
            testCases = testCases.testCases;
        } else if (testCases.steps && Array.isArray(testCases.steps)) {
            // Nếu là một test case đơn lẻ, bọc nó trong một mảng
            testCases = [testCases];
        }
    }

    // Kiểm tra lại nếu là array
    if (!Array.isArray(testCases)) {
        console.error("testCases is not an array:", testCases);
        throw new Error("testCases must be an array");
    }

    return testCases;
}

function generatePlaywrightScript(testCases) {
    let script = `import { test, expect } from '@playwright/test';\n\n`;
    script += `let page;\n\n`;
    
    // Add login setup
    script += generateLoginSetup();
    
    // Generate test cases
    testCases.forEach(testCase => {
        script += generateTestCase(testCase);
    });

    return script;
}

function generateLoginSetup() {
    return `test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://accounts.hara.vn/admin');
    await page.fill('#username', 'user123');
    await page.fill('#password', 'pass123');
    await page.click('#login-btn');
    await page.waitForSelector('#welcome-msg');
});\n\n`;
}

function generateTestCase(tc) {
    let script = `test('${tc.title || tc.description}', async () => {\n`;

    tc.steps.forEach(step => {
        script += generateStep(step);
    });

    script += `});\n\n`;
    return script;
}

function generateStep(step) {
    switch (step.action) {
        case "navigate":
            return `    await page.goto('${step.target}');\n`;
        case "click":
            return `    await page.click('${step.target}');\n`;
        case "fill":
            return `    await page.fill('${step.target}', '${step.value}');\n`;
        case "check":
            return `    await page.check('${step.target}');\n`;
        case "uncheck":
            return `    await page.uncheck('${step.target}');\n`;
        case "selectOption":
            return `    await page.selectOption('${step.target}', '${step.value}');\n`;
        case "waitFor":
            return `    await page.waitForSelector('${step.target}');\n`;
        case "expect":
            return `    await expect(page.locator("${step.target}")).toHaveText("${step.value}");\n`;
        default:
            console.warn(`Unsupported action: ${step.action}`);
            return '';
    }
}