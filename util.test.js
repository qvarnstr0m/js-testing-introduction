const { generateText, checkAndGenerate } = require('./util');

// Unit tests
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

// Integration tests
test('Should generate a valid text output', () => {
    const text = checkAndGenerate('Max', 29);
    expect(text).toBe('Max (29 years old)');
});