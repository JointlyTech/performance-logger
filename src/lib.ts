// Create a function which acts as a decorator and analyzes the function it decorates.

import { performance } from 'perf_hooks';
import { LogPerformanceDefault } from './default';
import { LogPerformanceOptions } from './models';

export function LogPerformance(_options: Partial<LogPerformanceOptions> = {}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const options: LogPerformanceOptions = {
      ...LogPerformanceDefault,
      ..._options
    };
    // If name is null, set it to the name of the class and the function
    const name = options.name ?? getName({ target, propertyKey });
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (!hasPassedValidation({ validation: options.validation, args }))
        return originalMethod.apply(this, args);

      const start = performance.now();
      const execution = originalMethod.apply(this, args);
      if (originalMethod.then) {
        execution.then(() =>
          handleElaborate({ start, name, log: options.log })
        );
      } else {
        handleElaborate({ start, name, log: options.log });
      }
      return execution;
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
    (typeof validation === 'function' && validation(...args))
  );
}

function handleElaborate({
  start,
  name,
  log
}: {
  start: number;
  name: string;
  log: ({ name, time }: { name: string; time: number }) => void;
}) {
  const end = performance.now();
  const time = end - start;
  log({ name, time });
}
