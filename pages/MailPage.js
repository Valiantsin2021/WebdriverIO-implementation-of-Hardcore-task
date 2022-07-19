
const BasePage = require ('../pages/BasePage');

const {urlMail, mail} = require ('../utils/constants')


class MailPage extends BasePage{

    get login(){ return $("#login");}
    get refreshBtn(){ return $("#refresh");}
    get monthlyEstimate(){ return $("#mail h2");}
    get frame(){ return $("#ifmail");}


    // Open yopmail.com

    async open(){
        const url = urlMail;
        await super.open()
        await browser.newWindow(url);

    }

    //      Create temporal email

    async setLocateMail(){

        await this.login.waitForExist({timeout: 5000});
        await this.login.setValue(mail);
        await browser.keys('Enter');

    }

    //      Check new email received and check monthly rent sum estimate

    async checkEmailEstimatedReceived(){

        await browser.pause(3000)
        await this.refreshBtn.waitForClickable({timeout: 5000});
        await this.refreshBtn.click();
        await browser.switchToFrame(await this.frame);

        console.log(await this.monthlyEstimate.getValue());
    }

    async close(){
        await super.close()
    }

}
module.exports = new MailPage();