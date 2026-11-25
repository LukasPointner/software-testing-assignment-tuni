
import toString from '../toString';

describe('toString', () => {

    describe('examples from func description', () => {
        const scenarios = [
            { value: null, exp: '', skip: 'Issue #3' },
            { value: undefined, exp: '', skip: 'Issue #3' },
            { value: -0, exp: '-0' },
            { value: [1, 2, 3], exp: '1,2,3' }
        ];
        const active = scenarios.filter(s => !s.skip);
        const skipped = scenarios.filter(s => s.skip);

        test.each(active)('toString($value) should return \'$exp\'',
            ({ value, exp, _skip }) => {
                expect(toString(value)).toBe(exp);
            }
        );

        test.skip.each(skipped)('toString($value) should return \'$exp\'',
            ({ value, exp, _skip }) => {
                expect(toString(value)).toBe(exp);
            }
        );
    });

    describe('additional scenarios', () => {
        const scenarios = [
            // Numbers
            { value: 42, exp: '42', name: 'positive integer' },
            { value: -3, exp: '-3', name: 'negative integer' },
            { value: 0, exp: '0', name: 'positive integer zero' },
            { value: 3.14, exp: '3.14', name: 'positive float' },
            { value: -1.41, exp: '-1.41', name: 'negative float' },
            { value: 0.0, exp: '0', name: 'positive float zero' },
            { value: -0.0, exp: '-0', name: 'negative float zero' },
            { value: Number.POSITIVE_INFINITY, exp: 'Infinity', name: 'positive infinity' },
            { value: Number.NEGATIVE_INFINITY, exp: '-Infinity', name: 'negative infinity' },
            { value: Number.NaN, exp: 'NaN', name: 'NaN' },
            { value: 1e6, exp: '1000000', name: 'scientific notation' },

            // BigInts
            { value: 12345678901234567890n, exp: '12345678901234567890', name: 'positive bigint' },
            { value: -12345678901234567890n, exp: '-12345678901234567890', name: 'negative bigint' },
            { value: 0n, exp: '0', name: 'positive zero bigint', skip: 'Issue #4' },
            { value: -0n, exp: '-0', name: 'negative zero bigint', skip: 'Issue #4' },

            // Strings
            { value: 'Hello, World!', exp: 'Hello, World!', name: 'non-empty string' },
            { value: '', exp: '', name: 'empty string' },
            { value: "''", exp: "''", name: 'nested string' },

            // Booleans
            { value: true, exp: 'true', name: 'boolean true' },
            { value: false, exp: 'false', name: 'boolean false' },

            // Symbols
            { value: Symbol('sym'), exp: 'Symbol(sym)', name: 'non-empty description symbol' },
            { value: Symbol(), exp: 'Symbol()', name: 'empty description symbol' },

            // Objects
            { value: { first: 'John', last: 'Doe' }, exp: '[object Object]', name: 'object' },
            { value: [1, 'a', null], exp: '1,a,', name: 'array with mixed types' },
            { value: /ab+c/, exp: '/ab+c/', name: 'regular expression' },
            { value: function() {}, exp: 'function () {}', name: 'function' },
        ];
        const active = scenarios.filter(s => !s.skip);
        const skipped = scenarios.filter(s => s.skip);

        test.each(active)('$name',
            ({ value, exp, _name }) => {
                expect(toString(value)).toBe(exp);
            }
        );

        test.skip.each(skipped)('$name',
            ({ value, exp, _name }) => {
                expect(toString(value)).toBe(exp);
            }
        );

    });
});
