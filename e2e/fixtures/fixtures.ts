import { test as base } from '@playwright/test';
import { ForecastDemoPage } from '../pages/forecast-demo.page';


type AppFixtures = {
  forecastDemoPage: ForecastDemoPage;
};

// Extend base test by providing "forecastDemoPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<AppFixtures>({
  forecastDemoPage: async ({ page }, use) => {
    const forecastDemoPage = new ForecastDemoPage(page);

    await use(forecastDemoPage);

  },

});
export { expect } from '@playwright/test';