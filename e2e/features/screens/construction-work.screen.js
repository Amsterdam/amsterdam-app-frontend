import Screen from './screen'

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

  get ConstructionWorkCardProjectStadhouderskade() {
    return element(by.id('ConstructionWorkCardProject1265107'))
  }

  get ConstructionWorkListProjects() {
    return element(by.id('ConstructionWorkListProjects'))
  }

  get ConstructionWorkTextInputNavigator() {
    return element(by.id('ConstructionWorkTextInputNavigator'))
  }

  get ConstructionWorkProjectsTextSearchField() {
    return element(by.id('ConstructionWorkProjectsTextSearchField'))
  }

  get ConstructionWorkProjectFollowButton() {
    return element(by.id('ConstructionWorkProjectFollowButton'))
  }
}

export default new ConstructionWorkScreen()
