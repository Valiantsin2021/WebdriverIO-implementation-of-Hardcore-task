const BasePage = require('../pages/BasePage')

const { urlMail, mail } = require('../utils/constants')

class MailPage extends BasePage {
  get cookies() {
    return $('#accept')
  }
  get login() {
    return $('#login')
  }
  get refreshBtn() {
    return $('#refresh')
  }
  get monthlyEstimate() {
    return $('#mail h2')
  }
  get frame() {
    return $('#ifmail')
  }

  // Open yopmail.com

  async open() {
    return await browser.newWindow(urlMail)
  }

  // Create temporal email

  async manageCookies() {
    if (await this.cookies.isExisting()) {
      await this.cookies.waitAndClick()
    }
    return
  }

  async setLocateMail() {
    await this.login.waitForExist({ timeout: 5000 })
    await this.login.setValue(mail)
    await browser.keys('Enter')
  }

  // Check new email received and check monthly rent sum estimate

  async checkEmailEstimatedReceived() {
    await this.refreshBtn.waitForClickable({ timeout: 5000 })
    await this.refreshBtn.click()
    await browser.switchToFrame(await this.frame)
  }

  async close() {
    await super.close()
  }
}
module.exports = new MailPage()
