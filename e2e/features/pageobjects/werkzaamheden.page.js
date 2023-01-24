const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WerkzaamhedenPage extends Page {
  /**
   * define selectors using getter methods
   */
  get WerkzaamhedenModule() {
    return element(by.id(''))
  }

  get ConstructionWorkCardProjectMiddenweg() {
    return element(by.id('ConstructionWorkCardProjectMiddenweg'))
    //ConstructionWorkCardProjectImageMain'
  }

  get ConstructionWorkCardProjectTextTitleMiddenweg() {
    return element(by.id('ConstructionWorkCardProjectTextTitleMiddenweg'))
  }

  get ConstructionWorkCardProjectTextSubtitleMiddenweg() {
    return element(
      by.id('ConstructionWorkCardProjectTextSubtitleGroot' + ' ' + 'onderhoud'),
    )
  }

  get ConstructionWorkListProjects() {
    return element(by.id('ConstructionWorkListProjects'))
  }

  get ConstructionWorkTextInputNavigator() {
    return element(by.id('ConstructionWorkTextInputNavigator'))
  }
}

module.exports = new WerkzaamhedenPage()
