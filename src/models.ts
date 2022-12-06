export interface LogPerformanceOptions {
  name: string | null;
  validation: boolean | Function;
  log: ({ name, time }: { name: string; time: number }) => void;
}
