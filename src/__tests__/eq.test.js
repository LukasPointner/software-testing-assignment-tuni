import eq from '../eq.js';

describe('eq', () => {

    describe('examples from func description', () => {
        const object = { 'a': 1 }
        const other = { 'a': 1 }

        const scenarios = [
            { value: object, other: object, exp: true },
            { value: object, other: other, exp: false },
            { value: 'a', other: 'a', exp: true },
            { value: 'a', other: Object('a'), exp: false },
            { value: NaN, other: NaN, exp: true }
        ];

        test.each(scenarios)('eq($value, $other) should return $exp', 
            ({ value, other, exp }) => {
                expect(eq(value, other)).toBe(exp);
            }
        );
    });


    describe('tests based on ECMA spec', () => {
        /** 
         * Scenarios based on the SameValueZero description from the ECMA spec:
         * http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero
        */

        const symbol1 = Symbol();
        const symbol2 = Symbol();
        const object1 = { a: 1 };
        const object2 = { b: 2 };

        const scenarios = [
            { value: 0, other: 'a', exp: false, name: 'different types return false' },
            { value: NaN, other: NaN, exp: true, name: 'two NaN return true' },
            { value: 0, other: -0, exp: true, name: '+0 and -0 return true' },
            { value: -0, other: +0, exp: true, name: '-0 and +0 return true' },
            { value: 42, other: 42, exp: true, name: 'same number values return true' },
            { value: 42, other: 3.14, exp: false, name: 'different number values return false' },
            { value: undefined, other: undefined, exp: true, name: 'two undefined return true' },
            { value: null, other: null, exp: true, name: 'two null return true' },
            { value: 'hello', other: 'hello', exp: true, name: 'same strings return true' },
            { value: 'hello', other: 'world', exp: false, name: 'different strings return false' },
            { value: true, other: true, exp: true, name: 'two true return true' },
            { value: false, other: false, exp: true, name: 'two false return true' },
            { value: true, other: false, exp: false, name: 'true and false return false' },
            { value: false, other: true, exp: false, name: 'false and true return false' },
            { value: symbol1, other: symbol1, exp: true, name: 'same symbol returns true' },
            { value: symbol1, other: symbol2, exp: false, name: 'different symbols return false' },
            { value: object1, other: object1, exp: true, name: 'same objects return true' },
            { value: object1, other: object2, exp: false, name: 'different objects return false' },
        ];

        test.each(scenarios)('$name', 
            ({ value, other, exp, _name }) => {
                expect(eq(value, other)).toBe(exp);
            }
        );
    });

    describe('exploratory tests', () => {

        const symbol1 = Symbol('foo');
        const symbol2 = Symbol('foo');
        const arr1 = [1, 2, 3];
        const arr2 = [1, 2, 3];

        const scenarios = [
            { value: NaN, other: 0, exp: false, name: 'NaN and 0 return false' },
            { value: Number.POSITIVE_INFINITY, other: Number.POSITIVE_INFINITY, exp: true, name: 'positive infinities return true' },
            { value: Math.PI, other: Math.PI, exp: true, name: 'same Math.PI return true' },
            { value: undefined, other: null, exp: false, name: 'undefined and null return false' },
            { value: symbol1, other: symbol2, exp: false, name: 'different symbols with same description return false' },
            { value: arr1, other: arr1, exp: true, name: 'same array returns true' },
            { value: arr1, other: arr2, exp: false, name: 'two different arrays with same values return false' },
        ];

        test.each(scenarios)('$name', 
            ({ value, other, exp, _name }) => {
                expect(eq(value, other)).toBe(exp);
            }
        );
    });
});
