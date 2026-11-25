import defaultTo from '../defaultTo';

describe('defaultTo', () => {

    const symbol = Symbol('sym');
    const object = { key: 'value' };
    const array = [1, 2, 3];
    const date = new Date();
    const regex = /ab+c/;
    const func = function() {};

    const scenarios = [
        // Replaced
        { value: NaN, defaultValue: 10, exp: 10, name: 'NaN is replaced', skip: 'Issue #5' },
        { value: Number.NaN, defaultValue: 10, exp: 10, name: 'Number.NaN is replaced', skip: 'Issue #5' },
        { value: null, defaultValue: 10, exp: 10, name: 'null is replaced' },
        { value: undefined, defaultValue: 10, exp: 10, name: 'undefined is replaced' },

        // Not replaced
        // Numbers
        { value: 1, defaultValue: 10, exp: 1, name: 'integer is not replaced' },
        { value: 3.14, defaultValue: 10, exp: 3.14, name: 'float is not replaced' },
        { value: Number.POSITIVE_INFINITY, defaultValue: 10, exp: Number.POSITIVE_INFINITY, name: 'positive infinity is not replaced' },
        { value: 1e6, defaultValue: 10, exp: 1e6, name: 'scientific notation is not replaced' },

        // BigInts
        { value: 12345678901234567890n, defaultValue: 10, exp: 12345678901234567890n, name: 'bigint is not replaced' },

        // Strings
        { value: 'Hello, World!', defaultValue: 10, exp: 'Hello, World!', name: 'non-empty string is not replaced' },
        { value: '', defaultValue: 10, exp: '', name: 'empty string is not replaced' },
        { value: "''", defaultValue: 10, exp: "''", name: 'nested string is not replaced' },
        { value: 'NaN', defaultValue: 10, exp: 'NaN', name: 'string "NaN" is not replaced' },
        { value: 'null', defaultValue: 10, exp: 'null', name: 'string "null" is not replaced' },
        { value: 'undefined', defaultValue: 10, exp: 'undefined', name: 'string "undefined" is not replaced' },

        // Booleans
        { value: true, defaultValue: 10, exp: true, name: 'boolean true is not replaced' },
        { value: false, defaultValue: 10, exp: false, name: 'boolean false is not replaced' },

        // Symbols
        { value: symbol, defaultValue: 10, exp: symbol, name: 'symbol is not replaced' },

        // Objects
        { value: object, defaultValue: 10, exp: object, name: 'object is not replaced' },
        { value: array, defaultValue: 10, exp: array, name: 'array is not replaced' },
        { value: date, defaultValue: 10, exp: date, name: 'date is not replaced' },
        { value: regex, defaultValue: 10, exp: regex, name: 'regex is not replaced' },
        { value: func, defaultValue: 10, exp: func, name: 'function is not replaced' },
    ];
    const active = scenarios.filter(s => !s.skip);
    const skipped = scenarios.filter(s => s.skip);

    test.each(active)('$name', 
        ({ value, defaultValue, exp, _name, _skip }) => {
            expect(defaultTo(value, defaultValue)).toBe(exp);
        }
    );

    test.skip.each(skipped)('$name', 
        ({ value, defaultValue, exp, _name, _skip }) => {
            expect(defaultTo(value, defaultValue)).toBe(exp);
        }
    );
});