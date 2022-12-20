import { hook } from 'hook-fn';
import { performance } from 'perf_hooks';
import { LogPerformanceDefault } from './default';
import { LogPerformanceOptions } from './models';

export function LogPerformance(_options: Partial<LogPerformanceOptions> = {}) {
  const options: LogPerformanceOptions = {
    ...LogPerformanceDefault,
    ..._options
  };

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // If name is null, set it to the name of the class and the function
    options.name = options.name ?? getName({ target, propertyKey });
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return performanceHook(options)(originalMethod).apply(this, args);
    };
  };
}

function getName({
  target,
  propertyKey
}: {
  target: any;
  propertyKey: string;
}): string {
  return `${target.constructor.name}.${propertyKey}`;
}

function hasPassedValidation({
  validation,
  args
}: {
  validation: boolean | Function;
  args: any[];
}) {
  return (
    (typeof validation === 'boolean' && validation) ||
    (typeof validation === 'function' && validation(...args)) ||
    false
  );
}

export function logPerformance(_options: Partial<LogPerformanceOptions> = {}) {
  const options: LogPerformanceOptions = {
    ...LogPerformanceDefault,
    ..._options
  };
  if (!options.name) {
    throw new Error(
      'Name is required for logPerformance higher-order function'
    );
  }

  return performanceHook(options);
}

function performanceHook(options: LogPerformanceOptions) {
  return hook({
    before: ({ context }) => {
      context.start = performance.now();
    },
    after: async ({ context, result, args }) => {
      if (result.then) result = await result;

      if (hasPassedValidation({ validation: options.validation, args }))
        options.log({
          name: options.name as string,
          executionTime: performance.now() - context.start,
          args,
          result
        });
    }
  });
}
