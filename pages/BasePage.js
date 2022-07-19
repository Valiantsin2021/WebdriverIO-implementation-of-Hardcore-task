

class BasePage{
    
    open () {
        return browser.url('./')
    }

    maximize(){
        return browser.maximizeWindow()
    }
}


module.exports = BasePage;
