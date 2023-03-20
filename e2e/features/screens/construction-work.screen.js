import Screen from './screen'

class ConstructionWorkScreen extends Screen {
  // Screen: Projects

  get ConstructionWorkMiddenwegProjectCard() {
    return element(by.id('ConstructionWork1270981ProjectCard'))
  }

  get ConstructionWorkMiddenwegProjectCardTitle() {
    return element(
      by
        .id('ConstructionWork1270981ProjectCard')
        .withDescendant(by.id('ConstructionWorkProjectCardTitle')),
    )
  }

  get ConstructionWorkMiddenwegProjectCardSubtitle() {
    return element(
      by
        .id('ConstructionWork1270981ProjectCard')
        .withDescendant(by.id('ConstructionWorkProjectCardSubtitle')),
    )
  }

  get ConstructionWorkAmstelIIIProjectCard() {
    return element(by.id('ConstructionWork976821ProjectCard'))
  }

  get ConstructionWorkStadhouderskadeProjectCard() {
    return element(by.id('ConstructionWork1265107ProjectCard'))
  }

  get ConstructionWorkAmstelProjectCard() {
    return element(by.id('ConstructionWork1271843ProjectCard'))
  }

  get ConstructionWorkOudezijdsVoorburgwalProjectCard() {
    return element(by.id('ConstructionWork1275403ProjectCard'))
  }

  get ConstructionWorkBijlmerSportparkProjectCard() {
    return element(by.id('ConstructionWork1271105ProjectCard'))
  }

  get ConstructionWorkListProjects() {
    return element(by.id('ConstructionWorkListProjects'))
  }

  get ConstructionWorkNavigatorSearchField() {
    return element(by.id('ConstructionWorkNavigatorSearchField'))
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
