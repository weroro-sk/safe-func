import {expect} from 'chai';

// Import the functions to be tested
import {safeBind} from '../src/index.js';

describe('safeBind', () => {
    it('should bind a function to a specific context and return the correct value', () => {
        const obj = {value: 42};
        const getValue = function (this: any) {
            return this.value;
        };
        const boundGetValue = safeBind(getValue, obj);
        expect(boundGetValue()).to.equal(42);
    });

    it('should bind a function to itself if no context is provided', () => {
        const getValue = function (this: any) {
            return this.value;
        };
        const boundGetValue = safeBind(getValue);
        expect(boundGetValue()).to.be.undefined; // No context, so this.value is undefined
    });

    it('should pass bind arguments correctly', () => {
        const add = function (a: number, b: number) {
            return a + b;
        };
        const boundAdd = safeBind(add, null, 1, 2);
        expect(boundAdd()).to.equal(3);
    });

    it('should pass function arguments correctly', () => {
        const add = function (a: number, b: number) {
            return a + b;
        };
        const boundAdd = safeBind(add);
        expect(boundAdd(1, 2)).to.equal(3);
    });

    it('should return a no-op function if binding fails', () => {
        const invalidFn = "null"; // Invalid function
        const boundFn = safeBind(invalidFn as any);
        expect(boundFn).to.be.a('function');
        expect(boundFn()).to.be.undefined; // No-op function should return undefined
    });
});
