import endsWith from '../endsWith.js'

test('end detection without position', () => {
    expect(endsWith('abc', 'c')).toBe(true)
});
