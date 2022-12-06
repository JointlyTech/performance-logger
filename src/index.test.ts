import { LogPerformance } from '.';

const logMap = new Map();

class MockPerformance {
  @LogPerformance({
    name: 'test',
    log: () => {
      logMap.set('test', (logMap.get('test') ?? 0) + 1);
    }
  })
  public static mockMethod() {
    return true;
  }

  @LogPerformance({
    name: 'testAsync',
    log: () => {
      logMap.set('testAsync', (logMap.get('testAsync') ?? 0) + 1);
    }
  })
  public static async mockMethodAsync() {
    // Return after a random timeout
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}

it('should log performance for both sync and async methods', async () => {
  MockPerformance.mockMethod();
  MockPerformance.mockMethod();
  MockPerformance.mockMethod();
  await MockPerformance.mockMethodAsync();
  expect(logMap.get('test')).toBe(3);
  expect(logMap.get('testAsync')).toBe(1);
});
