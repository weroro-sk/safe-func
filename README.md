# Safe Func

A collection of type-safe utility functions for **binding**, **applying**, **calling**, and **executing** functions in
JavaScript.

These functions ensure safe handling of context and arguments, providing fallback mechanisms for error handling and
enhancing code reliability.

```shell
npm install safe-func
```

- [Synopsis](#synopsis)
- [Testing](#testing)

---

## Synopsis

- [safeExec](#safeexec)
- [safeBind](#safebind)
- [safeCall](#safecall)
- [safeApply](#safeapply)

---

### safeExec

#### `safeExec(fn, ?<arg1, arg2 ... argN> )`

> This is a type-safe variant of directly invoking a `function`.

Safely executes a function with the provided arguments.
If the execution fails, it returns undefined.

#### params

- **fn** [`Function`] - The function to execute.
- **args** [`...any`] - _[optional]_ The arguments to pass to the function.

#### returns

- [`ReturnType<Function>`] - The result of the input function execution.

#### examples

```typescript
const greet = function () {
    console.log("Hello");
};
safeExec(greet); // Outputs: "Hello"
```

```typescript
const add = function (a, b) {
    return a + b;
};
console.log(safeExec(add, 1, 2)); // Outputs: 3
```

---

### safeBind

#### `safeBind(fn, thisArg, ?<arg1, arg2 ... argN> )`

> This is a type-safe variant of the native `Function.prototype.bind`.

Safely binds a function to a specific context (thisArg) and arguments.
If the binding fails, it returns a no-op function.

#### params

- **fn** [`Function`] - The function to execute.
- **thisArg** [`object|null`] - The context to call the function with.
- **args** [`...any`] - _[optional]_ The arguments to pass to the function.

#### returns

- [`Function`] - The input function constructor.
- [`Function`] - The input function constructor with added arguments.

#### examples

```typescript
const obj = {value: 42};
const getValue = function (this: any) {
    return this.value;
};
const boundGetValue = safeBind(getValue, obj);
console.log(boundGetValue()); // Outputs: 42
```

```typescript
const obj = {value: 42};
const getBool = function (this: any, arg1, arg2, arg3) {
    return this.value === (arg1 + arg2 + arg3);
};
const boundGetBool = safeBind(getValue, obj, 12, 21, 19);
console.log(boundGetBool()); // Outputs: true
```

---

### safeCall

#### `safeCall(fn, thisArg | null, ?<arg1, arg2 ... argN> )`

> This is a type-safe variant of the native `Function.prototype.call`.

Safely calls a function with a specific context and arguments.
If the call fails, it returns undefined.

#### params

- **fn** [`Function`] - The function to execute.
- **thisArg** [`object|null`] - The context to call the function with.
- **args** [`...any`] - _[optional]_ The arguments to pass to the function.

#### returns

- [`ReturnType<Function>`] - The result of the input function execution.

#### examples

```typescript
const obj = {value: 42};
const getValue = function (this: any) {
    return this.value;
};
console.log(safeCall(getValue, obj)); // Outputs: 42
```

```typescript
const obj = {value: 42};
const getValue = function (this: any, arg1, arg2, arg3) {
    return this.value === (arg1 + arg2 + arg3);
};
console.log(safeApply(getValue, obj, 12, 21, 19)); // Outputs: true 
```

---

### safeApply

#### `safeApply(fn, thisArg | null, ?[arg1, arg2 ... argN] )`

> This is a type-safe variant of the native `Function.prototype.apply`.

Safely applies a function with a specific context and arguments.
If the application fails, it returns undefined.

#### params

- **fn** [`Function`] - The function to execute.
- **thisArg** [`object|null`] - The context to call the function with.
- **argArray** [`any[]`] - _[optional]_ The array of arguments to pass to the function.

#### returns

- [`ReturnType<Function>`] - The result of the input function execution.

#### examples

```typescript 
const obj = {value: 42};
const getValue = function (this: any) {
    return this.value;
};
console.log(safeApply(getValue, obj)); // Outputs: 42
```

```typescript 
const obj = {value: 42};
const getValue = function (this: any, arg1, arg2, arg3) {
    return this.value === (arg1 + arg2 + arg3);
};
console.log(safeApply(getValue, obj, [12, 21, 19])); // Outputs: true
```

---

## Testing

Run all tests

```shell
npm run test
```

---

Run single test

**NPM**

```shell
npm run test:single -- "testCaseName"
```

(e.g: `npm run test:single -- "safeBind"`)

**PNPM**

```shell
pnpm run test:single "testCaseName"
```

(e.g: `pnpm run test:single "safeBind"`)

---

Run all tests in minimal mode (no report)

```shell
npm run test:min
```

---

[Nyan cat](https://www.nyan.cat/index.php?cat=original) test 😻

```shell
npm run test:nyan
```

---
