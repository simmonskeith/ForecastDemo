import { test, expect } from './fixtures/fixtures';

test.describe('ForecastDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('has title', async ({ forecastDemoPage }) => {
    expect(forecastDemoPage.title).toBe('Forecast Demo');
  });

  test('disables Get Forecast button when zip code is empty', async ({ forecastDemoPage }) => {
    await expect(forecastDemoPage.getForecastButton).toBeDisabled();
  })

  const locations = [
    { zip: '90210', city: 'Beverly Hills, CA' },
    { zip: '98382', city: 'Sequim, WA' },
    { zip: '33634', city: 'Tampa, FL' },
    { zip: '02121', city: 'Boston, MA' },
  ] as const;

  locations.forEach(({ zip, city }) => {
    test(`retrieves forecast data for ${city}`, async ({ page, forecastDemoPage }) => {
      await forecastDemoPage.getForecast(zip);
      await expect(page.getByText(`Forecast for ${city} ${zip}`)).toBeVisible();
      await expect(forecastDemoPage.forecastTable).toBeVisible();
      await expect(forecastDemoPage.forecastRows).toHaveCount(14); // 7 day forecast with day and night periods
    });
  });

  test('handles invalid zip code', async ({ page, forecastDemoPage }) => {
    await forecastDemoPage.getForecast('00000');
    await expect(page.getByText('Please enter a valid zip code to get the forecast.')).toBeVisible();
  });

});