// import { webkit } from 'playwright';
const { chromium, devices } = require('playwright');

describe('Playwright Turnabout', () => {
  let browser;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  it('Navigates to something', async () => {
    const pixel2 = devices['Pixel 2'];
    const context = await browser.newContext({
      ...pixel2,
    });
    const page = await context.newPage();
    await page.goto('http://whatsmyuseragent.org/');
  });

  afterAll(async () => {
    await browser.close();
  });
});
