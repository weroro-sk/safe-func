# Safe Func

A collection of type-safe utility functions for **binding**, **applying**, **calling**, and **executing** functions in
JavaScript.

These functions ensure safe handling of context and arguments, providing fallback mechanisms for error handling and
enhancing code reliability.

### safeExec

#### `safeExec(fn, ?<arg1, arg2 ... argN> )`

> This is a type-safe variant of directly invoking a `function`.

Safely executes a function with the provided arguments.
If the execution fails, it returns undefined.

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
