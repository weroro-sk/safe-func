import {expect} from 'chai';

// Import the functions to be tested
import {safeBind, safeApply, safeCall, safeExec} from '../src/index.js';

// Additional tests for type errors
describe('Type Errors', () => {
    it('should handle type errors gracefully in safeBind', () => {
        const invalidFn = 'not a function'; // Invalid type
        const boundFn = safeBind(invalidFn as any);
        expect(boundFn).to.be.a('function');
        expect(boundFn()).to.be.undefined; // No-op function should return undefined
    });

    it('should handle type errors gracefully in safeApply', () => {
        const invalidFn = 'not a function'; // Invalid type
        expect(safeApply(invalidFn as any)).to.be.undefined;
    });

    it('should handle type errors gracefully in safeCall', () => {
        const invalidFn = 'not a function'; // Invalid type
        expect(safeCall(invalidFn as any)).to.be.undefined;
    });

    it('should handle type errors gracefully in safeExec', () => {
        const invalidFn = 'not a function'; // Invalid type
        expect(safeExec(invalidFn as any)).to.be.undefined;
    });
});
