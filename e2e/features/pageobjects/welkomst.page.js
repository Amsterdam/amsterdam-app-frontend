const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WelkomstPage extends Page {
    /**
     * define selectors using getter methods
     */
    get welkomstSchermId () {
        return $('~Amsterdam');
    }

    async welkomClick () {
        await this.welkomstSchermId.click();
    }
}


module.exports = new WelkomstPage();