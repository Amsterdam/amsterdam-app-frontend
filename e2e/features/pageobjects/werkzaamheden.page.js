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
    return element(by.id('ConstructionWorkCardProject1270981'))
    //ConstructionWorkCardProjectImageMain'
  }

  get ConstructionWorkCardProjectTextTitleMiddenweg() {
    return element(
      by
        .id('ConstructionWorkCardProject1270981')
        .withDescendant(by.id('ConstructionWorkCardProjectTextTitle')),
    )
  }

  get ConstructionWorkCardProjectTextSubtitleMiddenweg() {
    return element(
      by
        .id('ConstructionWorkCardProject1270981')
        .withDescendant(by.id('ConstructionWorkCardProjectTextSubtitle')),
    )
  }

  get ConstructionWorkListProjects() {
    return element(by.id('ConstructionWorkListProjects'))
  }
}

module.exports = new WerkzaamhedenPage()
