import { chromium, devices, Browser, Page } from 'playwright';

describe('Angular app homepage', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    //iPhone 11 Pro
    const pixel2 = devices['Pixel 2'];
    const context = await browser.newContext({
      ...pixel2,
    });
    page = await browser.newPage();
    // page = await context.newPage();
  });

  it('Should display the correct page title', async () => {
    await page.goto('http://localhost:4200');
    expect(await page.title()).toBe('MyAngular9AppPlaywright');
  });

  it('should display welcome message', async () => {
    await page.goto('http://localhost:4200');
    const titleBannerContents = await page.$eval(
      'app-root .content span',
      (el: HTMLElement) => el.innerText
    );
    expect(titleBannerContents).toBe(
      'my-angular9-app-playwright app is running!'
    );
  });

  afterAll(async () => {
    await browser.close();
  });
});
