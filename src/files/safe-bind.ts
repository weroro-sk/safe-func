interface SafeBind {
    /**
     * This is a type-safe variant of the native `Function.prototype.bind`.
     *
     * Safely binds a function to a specific context (thisArg).
     * If the binding fails, it returns a no-op function.
     *
     * @template T - The type of the function to be bound.
     * @param {T} fn - The function to bind.
     * @param {object|null} thisArg - The context to bind the function to.
     *                                If not provided, the function will be bound to itself.
     * @returns {T} - The bound function or a no-op function if binding fails.
     *
     * @example
     * const obj = { value: 42 };
     * const getValue = function() { return this.value; };
     * const boundGetValue = safeBind(getValue, obj);
     * console.log(boundGetValue()); // Outputs: 42
     */
    <T extends ((...args: Parameters<T>) => ReturnType<T>)>
    (fn: T, thisArg: object): T;

    /**
     * This is a type-safe variant of the native `Function.prototype.bind`.
     *
     * Safely binds a function to a specific context (thisArg) and arguments.
     * If the binding fails, it returns a no-op function.
     *
     * @template T - The type of the function to be bound.
     * @param {T} fn - The function to bind.
     * @param {object|null} thisArg - The context to bind the function to.
     *                                If not provided, the function will be bound to itself.
     * @param {...Parameters<T>} [args] - The arguments to pass to the function.
     * @returns {T} - The bound function or a no-op function if binding fails.
     *
     * @example
     * const obj = { value: 42 };
     * const getBool = function(arg1, arg2, arg3) { return this.value === (arg1 + arg2 + arg3); };
     * const boundGetBool = safeBind(getValue, obj, 12, 21, 19);
     * console.log(boundGetBool()); // Outputs: true
     */
    <T extends ((...args: Parameters<T>) => ReturnType<T>)>
    (fn: T, thisArg: object | null, ...args: Parameters<T>): () => ReturnType<T>;
}

/**
 * This is a type-safe variant of the native `Function.prototype.bind`.
 *
 * Safely binds a function to a specific context (thisArg) and arguments.
 * If the binding fails, it returns a no-op function.
 *
 * @template T - The type of the function to be bound.
 * @param {T} fn - The function to bind.
 * @param {object|null} thisArg - The context to bind the function to.
 *                                If not provided, the function will be bound to itself.
 * @param {...Parameters<T>} [args] - The arguments to pass to the function.
 * @returns {T} - The bound function or a no-op function if binding fails.
 *
 * @example
 * const obj = { value: 42 };
 * const getValue = function() { return this.value; };
 * const boundGetValue = safeBind(getValue, obj);
 * console.log(boundGetValue()); // Outputs: 42
 *
 * @example
 * const obj = { value: 42 };
 * const getBool = function(arg1, arg2, arg3) { return this.value === (arg1 + arg2 + arg3); };
 * const boundGetBool = safeBind(getValue, obj, 12, 21, 19);
 * console.log(boundGetBool()); // Outputs: true
 */
export const safeBind: SafeBind = <T extends ((this: T, ...args: Parameters<T>) => ReturnType<T>)>(
    fn: T,
    thisArg?: object | null,
    ...args: Parameters<T>
): T => {
    try {
        // Attempt to bind the function to the specified context and arguments.
        return (fn as Function)?.bind(thisArg || fn, ...args as unknown[]) as T;
    } catch {
        // If binding fails, return a no-op function.
        return (() => {
        }) as T;
    }
};
