class BasePage {
  async open() {
    return await browser.url('./')
  }

  async maximize() {
    return await browser.maximizeWindow()
  }
}

module.exports = BasePage
