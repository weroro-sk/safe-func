import {expect} from 'chai';

// Import the functions to be tested
import {safeCall} from '../src/index.js';

describe('safeCall', () => {
    it('should call a function with a specific context and return the correct value', () => {
        const obj = {value: 42};
        const getValue = function (this: any) {
            return this.value;
        };
        expect(safeCall(getValue, obj)).to.equal(42);
    });

    it('should call a function with arguments correctly', () => {
        const obj = {value: 42};
        const add = function (this: any, a: number, b: number) {
            return this.value + a + b;
        };
        expect(safeCall(add, obj, 1, 2)).to.equal(45);
    });

    it('should call a function without arguments', () => {
        const obj = {value: 42};
        const add = function (this: any, a: number, b: number) {
            return this.value + a + b;
        };
        // @ts-ignore
        expect(Number.isNaN(safeCall(add, obj))).to.equal(Number.isNaN(NaN));
    });

    it('should handle type errors gracefully', () => {
        const invalidFn = 'not a function'; // Invalid type
        expect(safeCall(invalidFn as any, null)).to.be.undefined;
    });
});
