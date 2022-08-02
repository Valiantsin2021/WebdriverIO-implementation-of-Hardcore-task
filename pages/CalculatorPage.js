
const BasePage = require ('../pages/BasePage');

const { mail, searchText } = require('../utils/constants')
const { region } = require('../models/region');

class CalculatorPage extends BasePage{

    // Core Elements
    get cookies(){ return $("#L2AGLb");}
    get inputSearch() {return $("[name='q']");}
    get calculatorLink () {return $("a[href='https://cloud.google.com/products/calculator']");}
    get mainFrame() {return $("//devsite-iframe/iframe");}
    get secondFrame() {return $("#myFrame");}
    get computeEngine() {return $("//md-tab-item[1]/div[1]");}
    get instances() { return $("md-input-container.flex input[ng-model='listingCtrl.computeServer.quantity']");}
    get operatingSystemDropdown() { return $("#select_value_label_78 span");}
    get operatingSystem() { return $("#select_option_88 div");}
    get provisioningModelDropdown() { return $("#select_value_label_79 span.md-select-icon");}
    get provisioningModel() { return $("md-option[value='regular']");}
    get seriesDropdown() { return $("#select_value_label_81 span.md-select-icon");}
    get series() { return $("md-option[value='n1']");}
    get machineFamilyDropdown() { return $("#select_value_label_82 span.md-select-icon");}
    get machineFamily() { return $("//md-option[@value='CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8']");}
    get addGPUs() { return $("//form[@name='ComputeEngineForm']//md-checkbox[@aria-label='Add GPUs']");}
    get GPUTypeDropdown() { return $("md-select[aria-label='GPU type']");}
    get GPUType() { return $("md-option[value='NVIDIA_TESLA_V100']");}
    get numberOfGPUsDropdown() { return $("md-select[placeholder='Number of GPUs']");}
    get numberOfGPUs() { return $("//body/div[8]//md-option[2]");}
    get localSSDDropdown() { return $("#select_value_label_413 span.md-select-icon");}
    get localSSD() { return $("#select_option_440 div.md-text");}
    get dataCenterLocationDropdown() { return $("#select_value_label_84 span.md-select-icon");}
    get dataCenterLocation() { return $("#input_118");}
    get commitedUsageDropdown() { return $("#select_value_label_85 span.md-select-icon");}
    get commitedUsage() { return $("#select_option_124 div");}
    get addToEstimate() { return $("//*[@id='mainForm']//button[@aria-label='Add to Estimate']");}
    get estimateAd() { return $("md-content[ng-if='cloudCartCtrl.showComputeItems'] span")}
    get emailBtn() { return $("#email_quote");}
    get emailInput() { return $("input[ng-model='emailQuote.user.email']");}
    get sendEmailBtn() { return $("button[aria-label='Send Email']");}

    // Estimated elements

    get VMClassEstimate() { return $("md-list-item:nth-child(8) > div");}
    get instanceTypeEstimate() { return $("md-list-item:nth-child(10) > div.md-list-item-text.ng-binding");}
    get regionEstimate() { return $("md-list-item:nth-child(2) > div");}
    get SSDTypeEstimate() { return $("md-list-item[ng-if='item.items.ssd && item.items.ssd != 0'] > div");}
    get commitementTermEstimate() { return $("md-list-item:nth-child(6) > div");}
    get monthlyRentEstimate() { return $("b.ng-binding");}

    // Open Google Cloud

    async open(){
        return super.open();
    }

    async maximize(){
        return super.maximize();
    }
    
    //  Search for Google cloud calculator
    async manageCookies(){

        if(await this.cookies.waitForDisplayed()) {
        await this.cookies.click();
        }
    }

    async clickSearch(){

        await this.inputSearch.waitForDisplayed();
        await this.inputSearch.setValue(searchText);
        await browser.keys("Enter");
        await browser.pause(2000);
        console.log(await browser.getTitle());
        
    }

    // Click on Google cloud calculator link

    async setCalculator(){

        await this.calculatorLink.waitForDisplayed();
        await this.calculatorLink.click();
        await browser.pause(2000);
        console.log(await browser.getTitle());
    }

    // Switch to frame and compute engine

    async setComputeEngine(){

        await $(".devsite-snackbar-action").click();
        await this.mainFrame.waitForExist();
        await browser.switchToFrame(await this.mainFrame);
        await this.secondFrame.waitForExist();
        await browser.switchToFrame(await this.secondFrame);
        await browser.pause(3000);

        await this.computeEngine.waitForClickable();
        await this.computeEngine.click();
    }

    //  Set number of instances

    async setInstances(){

        await this.instances.waitForDisplayed();
        await this.instances.setValue("4");
        
    } 

    //  Set Operating system

    async setOperatingSystem(){

        await this.operatingSystemDropdown.waitForDisplayed();
        await this.operatingSystemDropdown.click();
        await this.operatingSystem.waitForDisplayed();
        await this.operatingSystem.click();

    }

    //  Set Provisioning model to Regular

    async setProvisioningModel(){

        await this.provisioningModelDropdown.waitForDisplayed();
        await this.provisioningModelDropdown.click();
        await this.provisioningModel.waitForDisplayed();
        await this.provisioningModel.click();
        
    }

    //      Set series to n1

    async setSeries(){

        await this.seriesDropdown.waitForDisplayed();
        await this.seriesDropdown.click();
        await this.series.waitForDisplayed();
        await this.series.click();

    }

    //      Set Instance type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)

    async setMachineFamily(){

        await this.machineFamilyDropdown.waitForDisplayed()
        await this.machineFamilyDropdown.click();
        await this.machineFamily.waitForDisplayed();
        await this.machineFamily.click();

    }

    //      Select add GPU

    async setAddGPUs(){

        await this.addGPUs.waitForDisplayed();
        await this.addGPUs.click();

    }

    //      Set GPU type NVIDIA Tesla V100

    async setGPUType(){

        await this.GPUTypeDropdown.waitForDisplayed();
        await this.GPUTypeDropdown.click();
        await this.GPUType.waitForDisplayed();
        await this.GPUType.click();

    }

    //      Set number of GPU to 1

    async setNumberOfGPUs(){

        await this.numberOfGPUsDropdown.waitForDisplayed()
        await this.numberOfGPUsDropdown.click();
        await this.numberOfGPUs.waitForDisplayed();
        await this.numberOfGPUs.click();

    }

    //      Set local SSD to 2x375 Gb

    async setLocalSSD(){

        await this.localSSDDropdown.waitForDisplayed();
        await this.localSSDDropdown.click();
        await this.localSSD.waitForDisplayed();
        await this.localSSD.click();

    }

    //      Set Datacenter location: Frankfurt (europe-west3)

    async setDataCenterLocation(){

        await this.dataCenterLocationDropdown.waitForDisplayed();
        await this.dataCenterLocationDropdown.click();
        await this.dataCenterLocation.waitForDisplayed();
        await this.dataCenterLocation.setValue(region);
        await browser.keys('Tab');
        await browser.keys('Enter');
        await browser.pause(2000);

    }

    //      Set Committed usage: 1 Year

    async setCommitedUsage(){

        await this.commitedUsageDropdown.waitForDisplayed();
        await this.commitedUsageDropdown.click();
        await this.commitedUsage.waitForDisplayed()
        await this.commitedUsage.click();

    }

    //      Click on estimate button

    async setAddToEstimate(){

        await this.addToEstimate.waitForDisplayed();
        await this.addToEstimate.click();

    }

    //      Send email with estimate

    async setSendMail(){


        await browser.switchToFrame(await this.mainFrame);
        await browser.switchToFrame(await this.secondFrame);
        await browser.pause(3000);

        await this.emailBtn.waitForDisplayed();
        await this.emailBtn.click();
        await this.emailInput.waitForDisplayed();
        await this.emailInput.setValue(mail);
        await this.sendEmailBtn.waitForDisplayed();
        await this.sendEmailBtn.click();

    }

}
module.exports = new CalculatorPage();