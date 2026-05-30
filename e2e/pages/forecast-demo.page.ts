import { Page, Locator } from '@playwright/test';

class ForecastDemoPage {
    public readonly title = 'Forecast Demo';
    public readonly zipCodeInput: Locator;
    public readonly getForecastButton: Locator;
    public readonly forecastTable: Locator;
    public readonly forecastRows: Locator;

    constructor(page: Page) {
        this.zipCodeInput = page.getByPlaceholder('Enter Zip Code');
        this.getForecastButton = page.getByRole('button', { name: 'Get Forecast' });
        this.forecastTable = page.getByTestId('forecast-table');
        this.forecastRows = this.forecastTable.locator('tbody tr');
    }

    async getForecast(zipCode: string) {
        await this.zipCodeInput.fill(zipCode);
        await this.getForecastButton.click();
    }
}

export { ForecastDemoPage };
