
const CalculatorPage = require('../pages/CalculatorPage');
const MailPage = require('../pages/MailPage');
var monthlyEstimateExpexted = "Estimated Monthly Cost: USD 1,081.20";

describe('Opens Google cloud calculator and adds data to create estimate', function(){
    
    it('Opens Google cloud website and searches for Google cloud calculator', async function(){
        
        await CalculatorPage.maximize();
        await CalculatorPage.open();
        await CalculatorPage.clickSearch();
        await expect(browser).toHaveUrlContaining("google");
    
    });

    it("Opens Google cloud calculator link and adds data to create estimate", async function(){
    
        await CalculatorPage.setCalculator();

        await expect(browser).toHaveTitle("Google Cloud Pricing Calculator");

        await CalculatorPage.setComputeEngine();
        await CalculatorPage.setInstances();
        await CalculatorPage.setOperatingSystem();
        await CalculatorPage.setProvisioningModel();
        await CalculatorPage.setSeries();
        await CalculatorPage.setMachineFamily();
        await CalculatorPage.setAddGPUs();
        await CalculatorPage.setGPUType();
        await CalculatorPage.setNumberOfGPUs();
        await CalculatorPage.setLocalSSD();
        await CalculatorPage.setDataCenterLocation();
        await CalculatorPage.setCommitedUsage();
        await CalculatorPage.setAddToEstimate();
        await expect(CalculatorPage.estimateAd).toHaveTextContaining("Compute Engine");

    });

    it("Checks the estimate data is as expected", async function(){

        await CalculatorPage.VMClass();
        await CalculatorPage.instanceType();
        await CalculatorPage.region();
        await CalculatorPage.SSDType();
        await CalculatorPage.commitmentTerm();
        await CalculatorPage.monthlyRent();
 
    });

    it("Open yopmail.com and creates temporal email", async function(){

        await browser.newWindow('https://google.com');
        await MailPage.open();
        console.log(await browser.getTitle());
    
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await MailPage.setLocateMail();
        await expect(browser).toHaveTitle("Входящие");        

    });

    it("Sends email with estimate to created email account", async function(){

        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[0]);
        console.log(await browser.getTitle());
        await CalculatorPage.setSendMail();
                
    });

    it("Switches back to mail page and checks email received", async function(){

        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await MailPage.checkEmailEstimatedReceived()
        await expect(MailPage.monthlyEstimate).toHaveTextContaining(monthlyEstimateExpexted);
        await browser.saveScreenshot('./screenshots/screenshot_end2end.png');

    });

})
