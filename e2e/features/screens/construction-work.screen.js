import Screen from './screen'

class ConstructionWorkScreen extends Screen {
  // Screen: Projects

  get middenwegProjectCard() {
    return element(by.id('ConstructionWork1270981ProjectCard'))
  }

  get middenwegProjectCardTitle() {
    return element(
      by
        .id('ConstructionWork1270981ProjectCard')
        .withDescendant(by.id('ConstructionWorkProjectCardTitle')),
    )
  }

  get middenwegProjectCardSubtitle() {
    return element(
      by
        .id('ConstructionWork1270981ProjectCard')
        .withDescendant(by.id('ConstructionWorkProjectCardSubtitle')),
    )
  }

  get amstelIIIProjectCard() {
    return element(by.id('ConstructionWork976821ProjectCard'))
  }

  get stadhouderskadeProjectCard() {
    return element(by.id('ConstructionWork1265107ProjectCard'))
  }

  get amstelProjectCard() {
    return element(by.id('ConstructionWork1271843ProjectCard'))
  }

  get oudezijdsVoorburgwalProjectCard() {
    return element(by.id('ConstructionWork1275403ProjectCard'))
  }

  get bijlmerSportparkProjectCard() {
    return element(by.id('ConstructionWork1271105ProjectCard'))
  }

  get projectsList() {
    return element(by.id('ConstructionWorkProjectsList'))
  }

  get projectsNavigatorSearchField() {
    return element(by.id('ConstructionWorkProjectsNavigatorSearchField'))
  }

  get projectsTextSearchField() {
    return element(by.id('ConstructionWorkProjectsTextSearchField'))
  }

  // Screen: Project

  get projectFollowButton() {
    return element(by.id('ConstructionWorkProjectFollowButton'))
  }

  get projectFollowButtonIcon() {
    return element(by.id('ConstructionWorkProjectFollowButtonIcon')).atIndex(0)
  }

  get projectFollowButtonLabel() {
    return element(by.id('ConstructionWorkProjectFollowButtonLabel'))
  }

  get projectFollowingTrait() {
    return element(by.id('ConstructionWorkProjectFollowingTrait'))
  }

  get projectFollowingTraitIcon() {
    return element(by.id('ConstructionWorkProjectFollowingTraitIcon'))
  }

  get projectFollowingTraitLabel() {
    return element(by.id('ConstructionWorkProjectFollowingTraitLabel'))
  }

  get projectImage() {
    return element(by.id('ConstructionWorkProjectImage'))
  }

  get projectFollowersNumber() {
    return element(by.id('ConstructionWorkProjectFollowersNumber'))
  }

  get projectFollowersText() {
    return element(by.id('ConstructionWorkProjectFollowersText'))
  }

  get projectTitle() {
    return element(by.id('ConstructionWorkProjectTitle'))
  }

  get projectSubtitle() {
    return element(by.id('ConstructionWorkProjectSubtitle'))
  }

  get projectArticlesTitle() {
    return element(by.id('ConstructionWorkProjectArticlesTitle'))
  }

  get projectAmstelIIIArticlePreviewDate() {
    return element(
      by.id(
        'ConstructionWorkProjectArticlec817f9ee-5e56-402e-949d-2e511923f4ddPreviewDate',
      ),
    )
  }

  get projectAmstelIIIArticlePreviewTitle() {
    return element(
      by.id(
        'ConstructionWorkProjectArticlec817f9ee-5e56-402e-949d-2e511923f4ddPreviewTitle',
      ),
    )
  }

  get projectAmstelIIIArticlePreviewImage() {
    return element(
      by.id(
        'ConstructionWorkProjectArticlec817f9ee-5e56-402e-949d-2e511923f4ddPreviewImage',
      ),
    )
  }
}

export default new ConstructionWorkScreen()
