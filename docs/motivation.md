# Why does this library exist? (motivation)

- [Type inference](#type-inference)
    - `Function.prototype.bind`
        - [problem](#functionprototypebind)
        - [solution](#solution)
    - `Function.prototype.call`
        - [problem](#functionprototypecall)
        - [solution](#solution-1)
    - `Function.prototype.apply`
        - [problem](#functionprototypeapply)
        - [solution](#solution-2)
- [Runtime Errors](#runtime-errors)
    - Function/Method execution
        - [problem](#functionmethod-execution)
        - [solution](#solution-3)
    - `Function.prototype.bind`
        - [problem](#functionprototypebind-1)
        - [solution](#solution-4)
    - `Function.prototype.call`
        - [problem](#functionprototypecall-1)
        - [solution](#solution-5)
    - `Function.prototype.apply`
        - [problem](#functionprototypeapply-1)
        - [solution](#solution-6)

---

## Type inference

### `Function.prototype.bind`

```typescript
const ctx = {value: 42};

const someFn = function (x: number, y: number): number {
    return this.value + x + y;
}

let ctor = someFn.bind(ctx);
ctor(); // Only during transpilation: TS2554: Expected 2 arguments, but got 0

ctor = someFn.bind(ctx, "a", 3); // Only during transpilation: TS2345: Argument of type string is not assignable to parameter of type number
ctor();

ctor = someFn.bind(ctx);
ctor("a", 3); // Only during transpilation: TS2345: Argument of type string is not assignable to parameter of type number

ctor = someFn.bind(ctx, 1, 2);
let result = ctor(); // Invalid return type - let result: any
// output: 45

```

### Solution

```typescript
import {safeBind} from "safe-func";

const ctx = {value: 42};

const someFn = function (this: any, x: number, y: number) {
    return this.value + x + y;
}

let ctor = safeBind(someFn, ctx);
ctor(); // TS2554: Expected 2 arguments, but got 0

ctor = safeBind(someFn, ctx, "a", 3); // TS2345: Argument of type string is not assignable to parameter of type number
ctor();

ctor = safeBind(someFn, ctx);
ctor("a", 3); // TS2345: Argument of type string is not assignable to parameter of type number

ctor = safeBind(someFn, ctx, 1, 2);
let result = ctor(); // let result: number
// output: 45
```

---

### `Function.prototype.call`

```typescript
const ctx = {value: 42};

const someFn = function (x: number, y: number): number {
    return this.value + x + y;
}

someFn.call(ctx); // Only during transpilation: TS2554: Expected 4 arguments, but got 2
someFn.call(ctx, "a", 3); // Only during transpilation: TS2345: Argument of type string is not assignable to parameter of type number
let result = someFn.call(ctx, 1, 2); // Invalid return type - let result: any
// output: 45
```

### Solution

```typescript
import {safeCall} from "safe-func";

const ctx = {value: 42};

const someFn = function (this: any, x: number, y: number) {
    return this.value + x + y;
}

safeCall(someFn, ctx); // TS2554: Expected 4 arguments, but got 2
safeCall(someFn, ctx, "a", 3); // TS2345: Argument of type string is not assignable to parameter of type number
let result = safeCall(someFn, ctx, 1, 3); // let result: number
```

---

### `Function.prototype.apply`

```typescript
const ctx = {value: 42};

const someFn = function (this: any, x: number, y: number): number {
    return this.value + x + y;
}

someFn.apply(ctx); // Only during transpilation: 
// TS2684: The 'this' context of type '(x: number, y: number) => number' is not assignable to method's 'this' of type '(this: { value: number; }) => number'. 
// Target signature provides too few arguments. Expected 2 or more, but got 0.

someFn.apply(ctx, ["a", 3]); // Only during transpilation: TS2322: Type 'string' is not assignable to type 'number'.

let result = someFn.apply(ctx, [1, 2]); // Invalid return type - let result: any
// output: 45
```

### Solution

```typescript
import {safeApply} from "safe-func";

const ctx = {value: 42};

const someFn = function (this: any, x: number, y: number) {
    return this.value + x + y;
}

safeApply(someFn, ctx); // TS2554: Expected 4 arguments, but got 2
safeApply(someFn, ctx, ...["a", 3]); // TS2345: Argument of type string is not assignable to parameter of type number
let result = safeApply(someFn, ctx, ...[1, 3]); // let result: number
```

---

## Runtime Errors

### Function/Method execution

```javascript
let fn = undefined;
fn(); // throws: TypeError: fn is not a function

fn = null;
fn(); // throws: TypeError: fn is not a function

fn = 1;
fn?.(); // throws: TypeError: fn is not a function

fn = "string";
fn?.(); // throws: TypeError: fn is not a function
```

### Solution

```javascript
import {safeExec} from "safe-func";

let fn = undefined;
safeExec(fn); // undefined

fn = null;
safeExec(fn); // undefined

fn = 1;
safeExec(fn); // undefined

fn = "string";
safeExec(fn); // undefined
```

---

### `Function.prototype.bind`

```javascript
const ctx = {value: 42};

let fn = undefined;
let fnCtor = fn.bind(ctx, 1, 3); // throws: TypeError: Cannot read properties of undefined (reading 'bind')
fnCtor();

fn = undefined;
fnCtor = fn?.bind(ctx, 1, 3);
fnCtor(); // throws: TypeError: fnCtor is not a function

fn = null;
fnCtor = fn.bind(ctx, 1, 3); // throws: TypeError: Cannot read properties of null (reading 'bind')
fnCtor();

fn = null;
fnCtor = fn?.bind(ctx, 1, 3);
fnCtor(); // throws: TypeError: fnCtor is not a function

fn = 1;
fnCtor = fn?.bind(ctx, 1, 3); // throws: TypeError: fn?.bind is not a function
fnCtor();

fn = "string";
fnCtor = fn?.bind(ctx, 1, 3); // throws: TypeError: fn?.bind is not a function
fnCtor();
```

### Solution

```javascript
import {safeBind} from "safe-func";

const ctx = {value: 42};

let fn = undefined;
let fnCtor = safeBind(fn, ctx, 1, 3);
fnCtor(); // undefined

fn = null;
fnCtor = safeBind(fn, ctx, 1, 3);
fnCtor(); // undefined

fn = 1;
fnCtor = safeBind(fn, ctx, 1, 3);
fnCtor(); // undefined

fn = "string";
fnCtor = safeBind(fn, ctx, 1, 3);
fnCtor(); // undefined
```

---

### `Function.prototype.call`

```javascript
const ctx = {value: 42};

let fn = undefined;
fn.call(ctx, 1, 3); // throws: TypeError: Cannot read properties of undefined (reading 'call')

fn = null;
fn.call(ctx, 1, 3); // throws: TypeError: Cannot read properties of null (reading 'call')

fn = 1;
fn?.call(ctx, 1, 3); // throws: TypeError: fn?.call is not a function

fn = "string";
fn?.call(ctx, 1, 3); // throws: TypeError: fn?.call is not a function
```

### Solution

```javascript
import {safeCall} from "safe-func";

const ctx = {value: 42};

let fn = undefined;
safeCall(fn, ctx, 1, 3); // undefined

fn = undefined;
safeCall(fn, ctx, 1, 3); // undefined

fn = null;
safeCall(fn, ctx, 1, 3); // undefined

fn = 1;
safeCall(fn, ctx, 1, 3); // undefined

fn = "string";
safeCall(fn, ctx, 1, 3); // undefined
```

---

### `Function.prototype.apply`

```javascript
const ctx = {value: 42};

let fn = undefined;
fn.apply(ctx, [1, 3]); // throws: TypeError: Cannot read properties of undefined (reading 'apply')

fn = null;
fn.apply(ctx, [1, 3]); // throws: TypeError: Cannot read properties of null (reading 'apply')

fn = 1;
fn?.apply(ctx, [1, 3]); // throws: TypeError: fn?.apply is not a function

fn = "string";
fn?.apply(ctx, [1, 3]); // throws: TypeError: fn?.apply is not a function
```

### Solution

```javascript
import {safeApply} from "safe-func";

const ctx = {value: 42};

let fn = undefined;
safeApply(fn, ctx, [1, 3]); // undefined

fn = null;
safeApply(fn, ctx, [1, 3]); // undefined

fn = 1;
safeApply(fn, ctx, [1, 3]); // undefined

fn = "string";
safeApply(fn, ctx, [1, 3]); // undefined
```

---
