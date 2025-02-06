import {safeBind} from "./safe-bind.js";

/**
 * This is a type-safe variant of the native `Function.prototype.apply`.
 *
 * Safely applies a function with a specific context and arguments.
 * If the application fails, it returns undefined.
 *
 * @template T - The type of the function to be applied.
 * @param {T} fn - The function to apply.
 * @param {object|null} thisArg - The context to apply the function to.
 * @param {Parameters<T>} [argArray=[]] - The arguments array to pass to the function.
 * @returns {ReturnType<T>} - The result of the function application.
 *
 * @example
 * const obj = { value: 42 };
 * const getValue = function() { return this.value; };
 * console.log(safeApply(getValue, obj)); // Outputs: 42
 *
 * @example
 * const obj = { value: 42 };
 * const getValue = function(arg1, arg2, arg3) { return this.value === (arg1 + arg2 + arg3); };
 * console.log(safeApply(getValue, obj, [12, 21, 19])); // Outputs: true
 */
export const safeApply = <T extends ((...argArray: Parameters<T>) => ReturnType<T>)>(
    fn: T,
    thisArg: object | null,
    argArray?: Parameters<T>
): ReturnType<T> =>
    // Use safeBind to bind the function and then immediately invoke it.
    (safeBind(fn, thisArg, ...(argArray || []) as Parameters<T>) as Function)();
