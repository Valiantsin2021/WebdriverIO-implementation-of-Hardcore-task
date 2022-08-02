

class BasePage{
    
    async open () {
        return browser.url('./')
    }

    async maximize(){
        return browser.maximizeWindow()
    }
}


module.exports = BasePage;
