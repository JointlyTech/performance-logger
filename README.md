# What is it?

This is a library providing both a higher-order function and a decorator that can be used to measure the performance of a function.  
It can be used both with `sync` and `async` functions.

# How do I install it?

You can install it by using the following command:

```bash
npm install @jointly/performance-logger
```

# How do I use it?

Both the higher-order function and the decorator can be used to measure the performance of a function.  
The decorator can be used to measure the performance of a class method, while the higher-order function can be used to measure the performance of any function.  

## Higher-Order Function

First, you need to create a logger.  
You can do this by using the `logPerformance` function.  
Then, you can wrap the function you want to measure by using the logger.

```js
import { logPerformance } from '@jointly/performance-logger';

const mockFn = (a, b) => a + b;

const logger = logPerformance({
  name: 'my-logger',
  validation: true,
  log: console.log
});

const loggedMockFn = logger(mockFn);

loggedMockFn(1, 2);
loggedMockFn(2, 3);
```

Example output (using `console.log`):

```bash
{
  name: 'my-logger',
  executionTime: 0.08937501907348633,
  args: [ 1, 2 ],
  result: 3
}
{
  name: 'my-logger',
  executionTime: 0.011166989803314209,
  args: [ 2, 3 ],
  result: 5
}
```

## Decorator

```js

import { LogPerformance } from '@jointly/performance-logger';

class MyClass {
  @LogPerformance({
    name: 'my-logger',
    validation: true,
    log: console.log
  })
  myMethod(a, b) {
    return a + b;
  }
}

const myClass = new MyClass();

myClass.myMethod(1, 2);
myClass.myMethod(2, 3);
```

Example output (using `console.log`):

```bash
{
  name: 'my-logger',
  executionTime: 0.07745802402496338,
  args: [ 1, 2 ],
  result: 3
}
{
  name: 'my-logger',
  executionTime: 0.012000024318695068,
  args: [ 2, 3 ],
  result: 5
}
```



# Tests

You can run the tests by using the following command:

```bash
npm test
```

# How does it work?

The decorator will measure the time it takes for a function to execute and log it to the console / the given logger.  
It expects an object with the following properties:

- `name` (_required_ for higher-order function, _optional_ for decorator): The name of the function to be measured
- `log` (_optional_): The function to call with the measuration results. Defaults to `console.log`.
  It will be called with the following parameters:
  - `name`: The name of the function to be measured
  - `executionTime`: The time it took for the function to execute in milliseconds
  - `args`: The arguments passed to the function to be measured
  - `result`: The result of the function to be measured
- `validation` (_optional_): A function or a boolean that will be called / verified before the function to be measured is called. Defaults to `true`.
  If it returns `false`, the function will be called but the measuration will not be logged.
  - If it is a function, it will be called with the arguments passed to the function to be measured.
  - If it is a boolean, it will be used as the validation result.

# Other Info

## The `name` parameter

The `name` parameter is used to identify the function/method to be measured.  
Please, be aware that even if the LogPerformance decorator can generate a name if not passed (based on class name and property name), it could lead to unexpected labels in an environment where the code is minified, obfuscated or transpiled.  
For this reason, it is highly recommended to pass a name to the decorator.