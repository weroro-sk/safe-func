import {safeBind} from "./safe-bind.js";

/**
 * This is a type-safe variant of the native `Function.prototype.call`.
 *
 * Safely calls a function with a specific context and arguments.
 * If the call fails, it returns undefined.
 *
 * @template T - The type of the function to be called.
 * @param {T} fn - The function to call.
 * @param {object|null} thisArg - The context to call the function with.
 * @param {...Parameters<T>} [args] - The arguments to pass to the function.
 * @returns {ReturnType<T>} - The result of the function call.
 *
 * @example
 * const obj = { value: 42 };
 * const getValue = function() { return this.value; };
 * console.log(safeCall(getValue, obj)); // Outputs: 42
 *
 * @example
 * const obj = { value: 42 };
 * const getValue = function(arg1, arg2, arg3) { return this.value === (arg1 + arg2 + arg3); };
 * console.log(safeApply(getValue, obj, 12, 21, 19)); // Outputs: true
 */
export const safeCall = <T extends ((...args: Parameters<T>) => ReturnType<T>)>(
    fn: T,
    thisArg: object | null,
    ...args: Parameters<T>
): ReturnType<T> =>
    // Use safeBind to bind the function and then immediately invoke it.
    (safeBind(fn, thisArg, ...args) as Function)();
