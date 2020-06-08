import { chromium, devices, Browser, Page } from 'playwright';

describe('Angular app homepage', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    //With Galaxy S5 The third test will fail
    const pixel2 = devices['Galaxy S5'];
    const context = await browser.newContext({
      ...pixel2,
    });
    // Use the below line for desktop testing
    // page = await browser.newPage();
    page = await context.newPage();
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

  it('should display the full link on mobile', async () => {
    await page.goto('http://localhost:4200');
    // await new Promise( resolve => setTimeout(resolve, 3000) );
    const checked = await page.click('#unclickable_link');
    console.log(checked);
  });

  afterAll(async () => {
    await browser.close();
  });
});
