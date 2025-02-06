## The problem with natives

- `Function.prototype.bind`
- `Function.prototype.call`
- `Function.prototype.apply`
- Function/Method execution

```javascript
const ctx = {value: 42};

const fn = undefined;
const fnCtor = fn.bind(ctx, 1, 3); // throw: TypeError: Cannot read properties of undefined (reading 'bind')
fnCtor();
```

```javascript
const fn = undefined;
const fnCtor = fn?.bind(ctx, 1, 3);
fnCtor(); // throw: TypeError: fnCtor is not a function
```

```javascript
const fn = null;
const fnCtor = fn?.bind(ctx, 1, 3);
fnCtor(); // throw: TypeError: fnCtor is not a function
```

```javascript
const fn = 1;
const fnCtor = fn?.bind(ctx, 1, 3); // throw: TypeError: fn?.bind is not a function
fnCtor();
```

```javascript
const fn = "string";
const fnCtor = fn?.bind(ctx, 1, 3); // throw: TypeError: fn?.bind is not a function
fnCtor();
```
