import Screen from './screen'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ConstructionWorkScreen extends Screen {
  /**
   * define selectors using getter methods
   */

  //Projectcards:
  get ConstructionWorkCardProjectMiddenweg() {
    return element(by.id('ConstructionWorkCardProject1270981'))
  }

  get ConstructionWorkCardProjectAmstelIII() {
    return element(by.id('ConstructionWorkCardProject976821'))
  }

  get ConstructionWorkCardProjectStadhouderskade() {
    return element(by.id('ConstructionWorkCardProject1265107'))
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

  get ConstructionWorkTextInputNavigator() {
    return element(by.id('ConstructionWorkTextInputNavigator'))
  }

  get ConstructionWorkProjectsTextSearchField() {
    return element(by.id('ConstructionWorkProjectsTextSearchField'))
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

  get ConstructionWorkProjectImage() {
    return element(by.id('ConstructionWorkProjectImage'))
  }

  get ConstructionWorkProjectFollowersNumber() {
    return element(by.id('ConstructionWorkProjectFollowersNumber'))
  }

  get ConstructionWorkProjectFollowersText() {
    return element(by.id('ConstructionWorkProjectFollowersText'))
  }

  get ConstructionWorkProjectTitle() {
    return element(by.id('ConstructionWorkProjectTitle'))
  }

  get ConstructionWorkProjectSubtitle() {
    return element(by.id('ConstructionWorkProjectSubtitle'))
  }

  get ConstructionWorkProjectArticlesTitle() {
    return element(by.id('ConstructionWorkProjectArticlesTitle'))
  }

  get ConstructionWorkProjectArticleAmstelIIIDate() {
    return element(
      by.id(
        'ConstructionWorkProjectArticlec817f9ee-5e56-402e-949d-2e511923f4ddPreviewDate',
      ),
    )
  }

  get ConstructionWorkProjectArticleAmstelIIIPreviewTitle() {
    return element(
      by.id(
        'ConstructionWorkProjectArticlec817f9ee-5e56-402e-949d-2e511923f4ddPreviewTitle',
      ),
    )
  }

  get ConstructionWorkProjectArticleAmstelIIIPreviewImage() {
    return element(
      by.id(
        'ConstructionWorkProjectArticlec817f9ee-5e56-402e-949d-2e511923f4ddPreviewImage',
      ),
    )
  }
}

export default new ConstructionWorkScreen()
