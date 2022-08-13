
const CalculatorPage = require('../pages/CalculatorPage');
const MailPage = require('../pages/MailPage');
const { vmClassExpected, instanceExpected, ssdExpected, commitmentTermExpected } = require('../utils/constants');
const { regionExpected, monthlyRentExpected , mailMonthlyEstimateExpexted} = require('../models/region');

describe('End to end test of Google Cloud calculator with the results emailed to temporary email account', function(){
    it('Opens Google cloud website and searches for Google cloud calculator', async function(){
        await CalculatorPage.maximize();
        await CalculatorPage.open();
        await CalculatorPage.manageCookies();
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
    it("Checks the VM class", async function(){
        //  Check Provisioning model is set to Regular in estimate
        await expect(CalculatorPage.VMClassEstimate).toHaveText(vmClassExpected);
    });
    it("Checks Instance type is n1-standard-8", async function(){ 
        //      Check Instance type is n1-standard-8 in estimate
        await expect(CalculatorPage.instanceTypeEstimate).toHaveText(instanceExpected);
    });
    it("Check region", async function(){ 
        // Check region
        await expect(CalculatorPage.regionEstimate).toHaveText(regionExpected);
    });
    it("Check Local SSD is 2x375 Gb", async function(){ 
        // Check Local SSD is 2x375 Gb
        await expect(CalculatorPage.SSDTypeEstimate).toHaveText(ssdExpected);
    });
    it("Check commitment term is set to 1 Year", async function(){ 
        // Check commitment term is set to 1 Year
        await expect(CalculatorPage.commitementTermEstimate).toHaveText(commitmentTermExpected);
    });
    it("Check monthly rent sum is the same with the manual test", async function(){
        //      Check monthly rent sum is the same with the manual test
        await expect(CalculatorPage.monthlyRentEstimate).toHaveText(monthlyRentExpected);
    });
    it("Open yopmail.com and creates temporal email", async function(){
        await MailPage.open();
        console.log(await browser.getTitle());
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await MailPage.manageCookies();
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
        await MailPage.checkEmailEstimatedReceived();
        await expect(MailPage.monthlyEstimate).toHaveTextContaining(mailMonthlyEstimateExpexted);
    });
});
