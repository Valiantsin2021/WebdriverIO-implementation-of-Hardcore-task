const CalculatorPage = require('../pages/CalculatorPage');

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
        await browser.saveScreenshot('./screenshots/screenshot_criticalPath.png');

    });
})