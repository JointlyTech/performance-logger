```js
import { LogPerformance } from '.';

class MockPerformance {
  @LogPerformance({ name: 'test', log: () => {} })
  public static mockMethod() {
    // Create a fake loop of 1000000 iterations
    for (let i = 0; i < 1000000; i++) {
      // Do nothing
    }
    return true;
  }

  @LogPerformance({ name: 'testAsync', log: () => {} })
  public static async mockMethodAsync() {
    // Return after a random timeout
    return new Promise((resolve) => {
      const timeout = Math.floor(Math.random() * 10000);
      // console.log('async timeout', timeout);
      setTimeout(() => {
        // console.log('async timeout done');
        resolve(true);
      }, timeout);
    });
  }
}
export default async () => {
  console.log(MockPerformance.mockMethod());
  console.log('abc', await MockPerformance.mockMethodAsync());
};
```
