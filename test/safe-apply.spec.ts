import {expect} from 'chai';

// Import the functions to be tested
import {safeApply} from '../src/index.js';

describe('safeApply', () => {
    it('should apply a function with a specific context and return the correct value', () => {
        const obj = {value: 42};
        const getValue = function (this: any) {
            return this.value;
        };
        expect(safeApply(getValue, obj)).to.equal(42);
    });

    it('should apply a function with arguments correctly', () => {
        const add = function (a: number, b: number) {
            return a + b;
        };
        expect(safeApply(add, null, [1, 2])).to.equal(3);
    });

    it('should handle type errors gracefully', () => {
        const invalidFn = 'not a function'; // Invalid type
        expect(safeApply(invalidFn as any, null)).to.be.undefined;
    });
});
