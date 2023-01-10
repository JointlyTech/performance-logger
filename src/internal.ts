import { hook } from "hook-fn";
import { LogPerformanceOptions } from "./models";
import { performance } from "perf_hooks";

export function getName({
  target,
  propertyKey
}: {
  target: any;
  propertyKey: string;
}): string {
  return `${target.constructor.name}.${propertyKey}`;
}

export function hasPassedValidation({
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

export function performanceHook(options: LogPerformanceOptions) {
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