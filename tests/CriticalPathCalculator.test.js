const CalculatorPage = require('../pages/CalculatorPage');
const { vmClassExpected, instanceExpected, ssdExpected, commitmentTermExpected } = require('../utils/constants');
const { regionExpected, monthlyRentExpected } = require('../models/region');

describe('Opens Google cloud calculator and adds data to create estimate', function(){
    
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

})