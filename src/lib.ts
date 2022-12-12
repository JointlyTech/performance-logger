import { performance } from 'perf_hooks';
import { LogPerformanceDefault } from './default';
import { LogPerformanceOptions, LogPerformanceOptionsLog } from './models';

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
    const name = options.name ?? getName({ target, propertyKey });
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (!hasPassedValidation({ validation: options.validation, args }))
        return originalMethod.apply(this, args);

      const start = performance.now();
      const execution = originalMethod.apply(this, args);
      if (originalMethod.then) {
        execution.then((result) =>
          handleElaborate({ start, name, log: options.log, args, result })
        );
      } else {
        handleElaborate({
          start,
          name,
          log: options.log,
          args,
          result: execution
        });
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
    (typeof validation === 'function' && validation(...args)) ||
    false
  );
}

function handleElaborate({
  start,
  name,
  log,
  args,
  result
}: {
  start: number;
  name: string;
  log: LogPerformanceOptionsLog;
  args: any[];
  result: any;
}) {
  const end = performance.now();
  const executionTime = end - start;
  log({ name, executionTime, args, result });
}
