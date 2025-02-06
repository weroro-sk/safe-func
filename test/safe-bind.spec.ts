import {expect} from 'chai';

// Import the functions to be tested
import {safeBind} from '../src/index.js';

describe('safeBind', () => {
    it('should bind a function to a specific context and return the correct value', () => {
        const obj = {value: 42};
        const getValue = function (this: any): number {
            return this.value;
        };
        const boundGetValue = safeBind(getValue, obj);
        expect(boundGetValue).to.be.a('function');
        expect(boundGetValue()).to.equal(42);
    });

    it('should pass bind arguments correctly', () => {
        const add = function (a: number, b: number) {
            return a + b;
        };
        const boundAdd = safeBind(add, null, 1, 2);
        expect(boundAdd()).to.equal(3);
    });

    it('should not pass bind arguments correctly', () => {
        const add = function (a: number, b: number) {
            return a + b;
        };
        const boundAdd = safeBind(add, {});
        // @ts-ignore
        expect(Number.isNaN(boundAdd())).to.equal(Number.isNaN(NaN));
    });

    it('should handle type errors gracefully', () => {
        const invalidFn = 'not a function'; // Invalid type
        expect(safeBind(invalidFn as any, null)).to.be.a('function');
        expect(safeBind(invalidFn as any, null, 1)).to.be.a('function');
    });
});
