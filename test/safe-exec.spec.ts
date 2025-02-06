import {expect} from 'chai';

// Import the functions to be tested
import {safeExec} from '../src/index.js';

describe('safeExec', () => {
    it('should execute a function and return the correct value', () => {
        const add = function () {
            return 42;
        };
        expect(safeExec(add)).to.equal(42);
    });

    it('should execute a function with the provided arguments and return the correct value', () => {
        const add = function (a: number, b: number) {
            return a + b;
        };
        expect(safeExec(add, 1, 2)).to.equal(3);
    });

    it('should execute a function without the provided arguments and return the incorrect value', () => {
        const add = function (a: number, b: number) {
            return a + b;
        };
        // @ts-ignore
        expect(Number.isNaN(safeExec(add))).to.be.equal(Number.isNaN(NaN));
    });

    it('should handle type errors gracefully', () => {
        const invalidFn = 'not a function'; // Invalid type
        expect(safeExec(invalidFn as any)).to.be.undefined;
    });
});
