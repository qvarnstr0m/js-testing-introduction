const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

// Unit tests with jest
test('Should output name and age', () => {
    const text = generateText('Martin', 42);
    expect(text).toBe('Martin (42 years old)');

    const text2 = generateText('Anna', 35); // Second check for false positives
    expect(text2).toBe('Anna (35 years old)');
});

test('Should output dataless text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});

// Integration tests with jest
test('Should generate a valid text output', () => {
    const text = checkAndGenerate('Max', 29);
    expect(text).toBe('Max (29 years old)');
});

// End-to-end test with puppeteer
test('should click around', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto('file:///Users/mac/Desktop/Jobb & Studier/JSUnitTesting/js-testing-introduction/index.html');
    await page.click('input#name');
    await page.type('input#name', 'anna');
    await page.click('input#age');
    await page.type('input#age', '28');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);

    expect(finalText).toBe('anna (28 years old)');
}, 10000);