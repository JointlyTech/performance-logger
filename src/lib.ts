import { LogPerformanceDefault } from './default';
import { getName, performanceHook } from './internal';
import { LogPerformanceOptions } from './models';

/* istanbul ignore next */
export function LogPerformance(_options: Partial<LogPerformanceOptions> = {}) {
  const options: LogPerformanceOptions = {
    ...LogPerformanceDefault,
    ..._options
  };
  if (typeof options.log !== 'function') {
    throw new Error('options.log must be a function');
  }

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

/* istanbul ignore next */
export function logPerformance(_options: Partial<LogPerformanceOptions> = {}) {
  const options: LogPerformanceOptions = {
    ...LogPerformanceDefault,
    ..._options
  };

  if (typeof options.log !== 'function') {
    throw new Error('options.log must be a function');
  }
  if (!options.name) {
    throw new Error(
      'Name is required for logPerformance higher-order function'
    );
  }

  return performanceHook(options);
}
