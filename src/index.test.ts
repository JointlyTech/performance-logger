import { logPerformance, LogPerformance } from '.';

it('should log performance for both sync and async methods', async () => {
  const logMap = new Map();
  class MockPerformance {
    @LogPerformance({
      log: () => {
        logMap.set('testMethod', (logMap.get('testMethod') ?? 0) + 1);
      }
    })
    public static mockMethod() {
      return true;
    }

    @LogPerformance({
      name: 'testAsyncMethod',
      log: () => {
        logMap.set('testAsyncMethod', (logMap.get('testAsyncMethod') ?? 0) + 1);
      }
    })
    public static async mockMethodAsync() {
      // Return after a random timeout
      return new Promise((resolve) => {
        resolve(true);
      });
    }
  }

  MockPerformance.mockMethod();
  MockPerformance.mockMethod();
  MockPerformance.mockMethod();
  await MockPerformance.mockMethodAsync();
  await MockPerformance.mockMethodAsync();
  expect(logMap.get('testMethod')).toBe(3);
  expect(logMap.get('testAsyncMethod')).toBe(2);
});

it('should check the function behaves in the same way as the decorator', async () => {
  const logMap = new Map();
  const mockMethod = () => {
    return true;
  };
  const mockMethodAsync = async () => {
    return new Promise((resolve) => {
      resolve(true);
    });
  };

  const loggableMockMethod = logPerformance({
    name: 'testFn',
    log: () => {
      logMap.set('testFn', (logMap.get('testFn') ?? 0) + 1);
    }
  })(mockMethod);

  const loggableMockMethodAsync = logPerformance({
    name: 'testAsyncFn',
    log: () => {
      logMap.set('testAsyncFn', (logMap.get('testAsyncFn') ?? 0) + 1);
    }
  })(mockMethodAsync);

  loggableMockMethod();
  loggableMockMethod();
  loggableMockMethod();
  await loggableMockMethodAsync();
  await loggableMockMethodAsync();

  expect(logMap.get('testFn')).toBe(3);
  expect(logMap.get('testAsyncFn')).toBe(2);
});

it('should not pass if validation is false', () => {
  const logMap = new Map();
  const mockMethod = () => {
    return true;
  };

  const loggableMockMethod = logPerformance({
    name: 'testFn',
    validation: false,
    log: () => {
      logMap.set('testFn', (logMap.get('testFn') ?? 0) + 1);
    }
  })(mockMethod);

  loggableMockMethod();
  loggableMockMethod();

  expect(logMap.get('testFn')).toBe(undefined);
});

it('should throw if name is not provided to HOF', () => {
  const mockMethod = () => {
    return true;
  };

  expect(() => {
    logPerformance({
      log: () => {
        return;
      }
    })(mockMethod);
  }).toThrow();
});
