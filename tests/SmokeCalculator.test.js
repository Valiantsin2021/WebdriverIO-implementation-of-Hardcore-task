const CalculatorPage = require('../pages/CalculatorPage');
const MailPage = require('../pages/MailPage');

describe('Smoke test of Google cloud calculator', () => {

    it("Checks the page opened is google", async function(){
        await CalculatorPage.maximize();
        await CalculatorPage.open();
        await browser.pause(2000);
        await CalculatorPage.manageCookies();
        await expect(browser).toHaveUrlContaining("google");
    });

    it('Search and open Google Cloud Pricing Calculator', async function(){
        await CalculatorPage.clickSearch();
        await CalculatorPage.setCalculator();
        await expect(browser).toHaveTitle("Google Cloud Pricing Calculator");
        await browser.pause(2000);
    });

    it('Opens yopmail.com mail page and creates temporary email account', async function(){
        await MailPage.open();
        console.log(await browser.getTitle());
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await browser.pause(2000);
        await MailPage.manageCookies();
        await MailPage.setLocateMail();
        await expect(browser).toHaveTitle("Входящие");
        await browser.saveScreenshot('./screenshots/screenshot_smoke.png');
    });
});