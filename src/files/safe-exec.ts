import {safeBind} from "./safe-bind.js";

/**
 * This is a type-safe variant of directly invoking a `function`.
 *
 * Safely executes a function with the provided arguments.
 * If the execution fails, it returns undefined.
 *
 * @template T - The type of the function to be executed.
 * @param {T} fn - The function to execute.
 * @param {...Parameters<T>} [args] - The arguments to pass to the function.
 * @returns {ReturnType<T>} - The result of the function execution.
 *
 * @example
 * const greet = function() { console.log("Hello"); };
 * safeExec(greet); // Outputs: "Hello"
 *
 * @example
 * const add = function(a, b) { return a + b; };
 * console.log(safeExec(add, 1, 2)); // Outputs: 3
 */
export const safeExec = <T extends ((...args: Parameters<T>) => ReturnType<T>)>(
    fn: T,
    ...args: Parameters<T>
): ReturnType<T> =>
    // Use safeBind to bind the function with null context and then immediately invoke it.
    (safeBind(fn, null, ...args) as Function)();
