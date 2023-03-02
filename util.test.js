const { generateText } = require('./util');

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