# Safe Func

The **Safe Func** library provides a set of type-safe utility functions designed to enhance the reliability of
function handling in JavaScript and TypeScript.

By offering safe variants of common function operations—such as execution, binding, calling, and applying—this library
ensures that developers can manage context and arguments effectively while minimizing the risk of errors. With fallback
mechanisms in place, these utilities return sensible defaults in case of failures, thereby promoting safer coding
practices.

The library is easy to install and integrate into existing projects, making it a valuable tool for any
JavaScript/TypeScript developer looking to improve code safety and maintainability.

## Installation

```shell
npm install safe-func
```

---

## Contents

- [Why does this library exist?](docs/motivation.md)
- [Synopsis](#synopsis)
- [Testing](#testing)

---

## Synopsis

- [safeExec](#safeexec) : safe variant of directly invoking a `function`
- [safeBind](#safebind) : safe variant of the native `Function.prototype.bind`
- [safeCall](#safecall) : safe variant of the native `Function.prototype.call`
- [safeApply](#safeapply) : safe variant of the native `Function.prototype.apply`

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
const add = function (a: number, b: number) {
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
const getBool = function (this: any, arg1: number, arg2: number, arg3: number) {
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
const getValue = function (this: any, arg1: number, arg2: number, arg3: number) {
    return this.value === (arg1 + arg2 + arg3);
};
console.log(safeApply(getValue, obj, 12, 21, 19)); // Outputs: true 
```

---

### safeApply

#### `safeApply(fn, thisArg | null, ...?[arg1, arg2 ... argN] )`

> This is a type-safe variant of the native `Function.prototype.apply`.

Safely applies a function with a specific context and arguments.
If the application fails, it returns undefined.

#### params

- **fn** [`Function`] - The function to execute.
- **thisArg** [`object|null`] - The context to call the function with.
- **args** [`...any[]`] - _[optional]_ The arguments to pass to the function.

> [!NOTE]
> Build-in
> JavaScript [`Function.prototype.apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
> needs an array-like object, specifying the arguments with which func should be called
>
> In `safeApply` you need to
> use [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
> e.g.: `safeApply(fn, ctx, ...[arg1, arg2, arg3])`

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
const getValue = function (this: any, arg1: number, arg2: number, arg3: number) {
    return this.value === (arg1 + arg2 + arg3);
};
console.log(safeApply(getValue, obj, ...[12, 21, 19])); // Outputs: true
```

---

## Testing

### Run all tests

```shell
npm run test
```

---

### Run single test

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

### Run all tests in minimal mode (no report)

```shell
npm run test:min
```

---

### [Nyan cat](https://www.nyan.cat/index.php?cat=original) test 😻

```shell
npm run test:nyan
```

---
