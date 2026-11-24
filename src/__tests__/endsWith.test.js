import endsWith from '../endsWith.js'

describe('endsWith (from test plan)', () => {

    /**
     * Scenarios taken from the test plan (Table 3)
     */
    const scenarios = [
        {in: ["abc", "c"], exp: true, name: 'end detection without position'},
        {in: ["abc", "b"], exp: false, name: 'no end detection without position'},
        {in: ["abc", "C"], exp: false, name: 'case sensitivity with wrong end'},
        {in: ["abC", "C"], exp: true, name: 'case sensitivity right end'},
        {in: ["abc", "bc"], exp: true, name: 'end detection without position and multiple characters'},
        {in: ["abc", "abc"], exp: true, name: 'end detection without position and same length'},
        {in: ["abc", "abcd"], exp: false, name: 'longer than reference'},
        {in: ["abc", "a", 1], exp: true, name: 'end detection with position'},
        {in: ["abc", "a", 2], exp: false, name: 'no end detection with position'},
        {in: ["abc", "c", 4], exp: true, name: 'position larger than string'},
        {in: ["abc", "c", -1], exp: false, name: 'negative position'},
        {in: ["abc", "c", "a"], exp: false, name: 'position is string but end right'},
        {in: ["abc"], exp: TypeError, name: 'no target'},
        {in: ["", "a"], exp: false, name: 'empty string but target given'},
        {in: ["", ""], exp: true, name: 'both strings empty'},
        {in: ["abc", 3], exp: false, name: 'number as target'},
        {in: [123, "3"], exp: false, name: 'number as string'},
        {in: ["abc", true], exp: false, name: 'boolean as target'},
        {in: [true, "e"], exp: false, name: 'boolean as string'}
    ];

    test.each(scenarios)('$name', 
        ({in: [str, target, position], exp, _name}) => {
            if (exp === TypeError) {
                expect(() => endsWith(str, target, position)).toThrow(TypeError);
            } else {
                expect(endsWith(str, target, position)).toBe(exp);
            }
        }
    )
});
