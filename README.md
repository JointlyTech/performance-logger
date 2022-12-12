# What is it?

This is a decorator that can be used to measure the performance of a function.  
It can be used both with `sync` and `async` functions.

# How do I install it?

You can install it by using the following command:

```bash
npm install @jointly/performance-logger
```

# Tests

You can run the tests by using the following command:

```bash
npm test
```

# How does it work?

The decorator will measure the time it takes for a function to execute and log it to the console / the given logger.  
It expects an object with the following properties:

- `name`: The name of the function to be measured
- `log`: The function to call with the measuration results. It will be called with the following parameters:
  - `name`: The name of the function to be measured
  - `executionTime`: The time it took for the function to execute
  - `args`: The arguments passed to the function to be measured
  - `result`: The result of the function to be measured
- `validation`: A function or a boolean that will be called / verified before the function to be measured is called. If it returns `false`, the function will be called but the measuration will not be logged.
  - If it is a function, it will be called with the arguments passed to the function to be measured.
  - If it is a boolean, it will be used as the validation result.

# Other Info

## The `name` parameter

The `name` parameter is used to identify the class method to be measured.  
Please, be aware that even if the LogPerformance decorator can generate a name if not passed (based on class name and property name), it could lead to unexpected labels in an environment where the code is minified, obfuscated or transpiled.  
For this reason, it is highly recommended to pass a name to the decorator.