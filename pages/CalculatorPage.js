const BasePage = require('../pages/BasePage')

const { mail, searchText } = require('../utils/constants')
const { region } = require('../models/region')

class CalculatorPage extends BasePage {
  // Core Elements
  get cookies() {
    return $('#L2AGLb')
  }
  get inputSearch() {
    return $("[name='q']")
  }
  get searchBtn() {
    return $("div.FPdoLc  > center > input[name='btnK']")
  }
  get calculatorLink() {
    return $("a[href='https://cloud.google.com/products/calculator']")
  }
  get mainFrame() {
    return $('//devsite-iframe/iframe')
  }
  get secondFrame() {
    return $('#myFrame')
  }
  get computeEngine() {
    return $('//md-tab-item[1]/div[1]')
  }
  get instances() {
    return $(
      "md-input-container.flex input[ng-model='listingCtrl.computeServer.quantity']"
    )
  }
  get operatingSystemDropdown() {
    return $(
      "md-select[ng-model='listingCtrl.computeServer.os'] > md-select-value"
    )
  }
  get operatingSystem() {
    return $("md-option[value='free']")
  }
  get provisioningModelDropdown() {
    return $("md-select[aria-label='VM Class: Regular'] > md-select-value")
  }
  get provisioningModel() {
    return $("md-option[value='regular']")
  }
  get seriesDropdown() {
    return $("md-select[placeholder='Series'] > md-select-value")
  }
  get series() {
    return $("md-option[value='n1']")
  }
  get machineFamilyDropdown() {
    return $("md-select[placeholder='Instance type'] > md-select-value")
  }
  get machineFamily() {
    return $("//md-option[@value='CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8']")
  }
  get addGPUs() {
    return $(
      "//form[@name='ComputeEngineForm']//md-checkbox[@aria-label='Add GPUs']"
    )
  }
  get GPUTypeDropdown() {
    return $("md-select[aria-label='GPU type']")
  }
  get GPUType() {
    return $("md-option[value='NVIDIA_TESLA_V100']")
  }
  get numberOfGPUsDropdown() {
    return $("md-select[placeholder='Number of GPUs']")
  }
  get numberOfGPUs() {
    return $('//body/div[8]//md-option[2]')
  }
  get localSSDDropdown() {
    return $("md-select[placeholder='Local SSD'] > md-select-value")
  }
  get localSSD() {
    return $('//body/div[9]//md-option[3]/div')
  }
  get dataCenterLocationDropdown() {
    return $('//div[16]/div[1]//md-select-value')
  }
  get dataCenterLocation() {
    return $("input[ng-model='listingCtrl.inputRegionText.computeServer']")
  }
  get commitedUsageDropdown() {
    return $("md-select[aria-label='Committed usage: None'] >md-select-value")
  }
  get commitedUsage() {
    return $("div[aria-hidden='false'] md-option[ng-value='1'] >div.md-text")
  }
  get addToEstimate() {
    return $("//*[@id='mainForm']//button[@aria-label='Add to Estimate']")
  }
  get estimateAd() {
    return $("md-content[ng-if='cloudCartCtrl.showComputeItems'] span")
  }
  get emailBtn() {
    return $('#email_quote')
  }
  get emailInput() {
    return $("input[ng-model='emailQuote.user.email']")
  }
  get sendEmailBtn() {
    return $("button[aria-label='Send Email']")
  }

  // Estimated elements

  get VMClassEstimate() {
    return $('md-list-item:nth-child(8) > div')
  }
  get instanceTypeEstimate() {
    return $('md-list-item:nth-child(10) > div.md-list-item-text.ng-binding')
  }
  get regionEstimate() {
    return $('md-list-item:nth-child(2) > div')
  }
  get SSDTypeEstimate() {
    return $(
      "md-list-item[ng-if='item.items.ssd && item.items.ssd != 0'] > div"
    )
  }
  get commitementTermEstimate() {
    return $('md-list-item:nth-child(6) > div')
  }
  get monthlyRentEstimate() {
    return $('b.ng-binding')
  }

  // Open Google Cloud

  async open() {
    return await super.open()
  }

  async maximize() {
    return await super.maximize()
  }

  //  Search for Google cloud calculator
  async manageCookies() {
    if (await this.cookies.isExisting()) {
      await this.cookies.waitAndClick()
    }
    return
    // await browser.waitUntil(async () => {
    //     return await this.cookies.isDisplayed()
    //     }, 6000)
    // await this.cookies.click()
  }

  async clickSearch() {
    await this.inputSearch.waitForDisplayed({ timeout: 3000 })
    await this.inputSearch.setValue(searchText)
    await browser.keys('Tab')
    await this.searchBtn.waitAndClick()
    console.log(await browser.getTitle())
  }

  // Click on Google cloud calculator link

  async setCalculator() {
    await this.calculatorLink.waitAndClick()
    console.log(await browser.getTitle())
  }

  // Switch to frame and compute engine

  async setComputeEngine() {
    await $('.devsite-snackbar-action').click()
    await this.mainFrame.waitForExist({ timeout: 3000 })
    await browser.switchToFrame(await this.mainFrame)
    await this.secondFrame.waitForExist({ timeout: 3000 })
    await browser.switchToFrame(await this.secondFrame)
    await this.computeEngine.waitAndClick()
    // await this.computeEngine.waitForClickable({ timeout: 3000 });
    // await this.computeEngine.click();
  }

  //  Set number of instances

  async setInstances() {
    await this.instances.waitForDisplayed({ timeout: 3000 })
    await this.instances.setValue('4')
  }

  //  Set Operating system

  async setOperatingSystem() {
    await this.operatingSystemDropdown.waitAndClick()
    await this.operatingSystem.waitAndClick()
  }

  //  Set Provisioning model to Regular

  async setProvisioningModel() {
    await this.provisioningModelDropdown.waitAndClick()
    await this.provisioningModel.waitAndClick()
  }

  // Set series to n1

  async setSeries() {
    await this.seriesDropdown.waitAndClick()
    await this.series.waitAndClick()
  }

  // Set Instance type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)

  async setMachineFamily() {
    await this.machineFamilyDropdown.waitAndClick()
    await this.machineFamily.waitAndClick()
  }

  // Select add GPU

  async setAddGPUs() {
    await this.addGPUs.waitAndClick()
  }

  // Set GPU type NVIDIA Tesla V100

  async setGPUType() {
    await this.GPUTypeDropdown.waitAndClick()
    await this.GPUType.waitAndClick()
  }

  // Set number of GPU to 1

  async setNumberOfGPUs() {
    await this.numberOfGPUsDropdown.waitAndClick()
    await this.numberOfGPUs.waitAndClick()
  }

  // Set local SSD to 2x375 Gb

  async setLocalSSD() {
    await this.localSSDDropdown.waitAndClick()
    await this.localSSD.waitAndClick()
  }

  // Set Datacenter location: Frankfurt (europe-west3)

  async setDataCenterLocation() {
    await this.dataCenterLocationDropdown.waitAndClick()
    await this.dataCenterLocation.waitForDisplayed({ timeout: 3000 })
    await this.dataCenterLocation.setValue(region)
    await browser.keys('Tab')
    await browser.keys('Enter')
  }

  // Set Committed usage: 1 Year

  async setCommitedUsage() {
    await this.commitedUsageDropdown.waitAndClick()
    await this.commitedUsage.waitAndClick()
  }

  // Click on estimate button

  async setAddToEstimate() {
    await this.addToEstimate.waitAndClick()
  }

  // Send email with estimate

  async setSendMail() {
    await browser.switchToFrame(await this.mainFrame)
    await browser.switchToFrame(await this.secondFrame)

    await this.emailBtn.waitAndClick()
    await this.emailInput.waitForDisplayed({ timeout: 3000 })
    await this.emailInput.setValue(mail)
    await this.sendEmailBtn.waitAndClick()
  }
}
module.exports = new CalculatorPage()
