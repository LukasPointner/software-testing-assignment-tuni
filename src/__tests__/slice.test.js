import slice from '../slice.js';

describe('slice (from test plan)', () => {

    /**
     * Scenarios taken from the test plan (Table 4)
     */
    const scenarios = [
        {in: [[1, 2, 3, 4], 1, 3], exp: [2, 3], name: 'standard slice'},
        {in: [[1, 2, 3, 4], undefined, 3], exp: [1, 2, 3], name: 'missing start'},
        {in: [[1, 2, 3, 4], 2], exp: [3, 4], name: 'missing end'},
        {in: [[1, 2, 3, 4]], exp: [1, 2, 3, 4], name: 'missing start and end'},
        {in: [[1, 2, 3, 4], 0, 4], exp: [1, 2, 3, 4], name: 'full array'},
        {in: [[1, 2, 3, 4], 1, 1], exp: [], name: 'start and end same'},
        {in: [[1, 2, 3, 4], 5], exp: [], name: 'start bigger than array'},
        {in: [[1, 2, 3, 4], 0, 5], exp: [1, 2, 3, 4, undefined], name: 'end beyond array length'},
        {in: [[1, 2, 3, 4], 5, 7], exp: [undefined, undefined], name: 'start and end beyond array length'},
        {in: [[1, 2, 3, 4], 2, 1], exp: [], name: 'start bigger than end'},
        {in: [[1, 2, 3, 4], -2], exp: [3, 4], name: 'negative start'},
        {in: [[1, 2, 3, 4], -5], exp: [1, 2, 3, 4], name: 'negative start bigger than array'},
        {in: [[1, 2, 3, 4], -2, -1], exp: [3], name: 'both negative'},
        {in: [[1, 2, 3, 4], 0, -1], exp: [1, 2, 3], name: 'negative end'},
        {in: [[1, 2, 3, 4], 1, -5], exp: [], name: 'negative end bigger than array'},
        {in: [[], 0, 2], exp: [], name: 'empty array'},
        {in: [null, 0, 2], exp: [], name: 'null array'},
        {in: [[1, 2, 3, 4], null, 2], exp: [1, 2], name: 'null start'},
        {in: [[1, 2, 3, 4], 0, null], exp: [], name: 'null end'},
        {in: [[1, 2, 3, 4], "1", "3"], exp: [2, 3], name: 'string start and end'},
        {in: [[1, 2, 3, 4], "a", "b"], exp: [], name: 'string with character start and end'}
    ];

    test.each(scenarios)('$name',
        ({in: [arr, start, end], exp, _name}) => {
            expect(slice(arr, start, end)).toEqual(exp);
        }
    );
});
