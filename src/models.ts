export type LogPerformanceOptionsLog = ({
  name,
  executionTime,
  args,
  result
}: {
  name: string;
  executionTime: number;
  args: any[];
  result: any;
}) => void;

export interface LogPerformanceOptions {
  name: string | null;
  validation: boolean | Function;
  log: LogPerformanceOptionsLog;
}
