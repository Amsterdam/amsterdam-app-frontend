const Screen = require('./screen')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ConstructionWorkScreen extends Screen {
  /**
   * define selectors using getter methods
   */
  get ConstructionWorkCardProjectMiddenweg() {
    return element(by.id('ConstructionWorkCardProject1270981'))
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

module.exports = new ConstructionWorkScreen()
