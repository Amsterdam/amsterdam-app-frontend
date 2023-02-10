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

  get ConstructionWorkCardProjectAmstel() {
    return element(by.id('ConstructionWorkCardProject1271843'))
  }

  get ConstructionWorkCardProjectOudezijdsVoorburgwal() {
    return element(by.id('ConstructionWorkCardProject1275403'))
  }

  get ConstructionWorkCardProjectBijlmerSportpark() {
    return element(by.id('ConstructionWorkCardProject1271105'))
  }

  get ConstructionWorkProjectFollowButton() {
    return element(by.id('ConstructionWorkProjectFollowButton'))
  }

  get ConstructionWorkProjectTraitFollowing() {
    return element(by.id('ConstructionWorkProjectTraitFollowing'))
  }

  get ConstructionWorkProjectTraitFollowingIcon() {
    return element(by.id('ConstructionWorkProjectTraitFollowingIcon'))
  }

  get ConstructionWorkProjectTraitFollowingLabel() {
    return element(by.id('ConstructionWorkProjectTraitFollowingLabel'))
  }

  get ConstructionWorkProjectFollowButtonLabel() {
    return element(by.id('ConstructionWorkProjectFollowButtonLabel'))
  }

  get ConstructionWorkProjectFollowButtonIcon() {
    return element(by.id('ConstructionWorkProjectFollowButtonIcon')).atIndex(0)
  }
}

export default new ConstructionWorkScreen()
