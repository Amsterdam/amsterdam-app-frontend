const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ContactPage extends Page {
    /**
     * define selectors using getter methods
     */
    get header () {
        return $('~Kunnen we u helpen?');
    }

    get headerParagraph () {
        return $('~Heeft u een vraag of wilt u iets weten? Neem op werkdagen contact met ons op.')
    }
    
    get stadsLoketCentrum () {
        return $('//XCUIElementTypeButton[@name="Stadsloket Centrum Amstel 1, 1011 PN, Amsterdam"]')
    }

    get stadsLoketNW() {
        return $('//XCUIElementTypeButton[@name="Stadsloket Centrum Amstel 1, 1011 PN, Amsterdam"]')
    }

    get stadsLoketNWbyAccessabilityId() {
        return $('~Stadsloket Nieuw-West Osdorpplein 946, 1068 TD, Amsterdam')
    }

    get stadsdeelOost() {
        return $('//XCUIElementTypeButton[@name="Stadsloket Oost Oranje-Vrijstaatplein 2, 1093 NG, Amsterdam"]')
    }

    get bekijkRouteKnop() {
        return $('~Bekijk route')
    }
    // async menuItem(label) {
    //     return $(`XCUIElementTypeButton[@name="\$(label)\"]`)
    // }
    
}


module.exports = new ContactPage();