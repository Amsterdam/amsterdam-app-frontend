import {expect} from 'detox'
import {autoBindSteps, loadFeatures} from 'jest-cucumber'
import ConstructionWorkScreen from '../screens/construction-work.screen'
import HomeScreen from '../screens/home.screen'
import WelcomeScreen from '../screens/welcome.screen'

const features = loadFeatures('e2e/features/construction-work.feature', {
  tagFilter: '@included and not @excluded',
})

const constructionWorkSteps = ({given, when, then, and}) => {
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {notifications: 'YES'},
    })
  })

  given(/ik ben op het werkzaamheden scherm/, async () => {
    await WelcomeScreen.tap()
    await HomeScreen.tapModule('Werkzaamheden')
  })

  then(/de werkzaamheden worden weergegeven met een afbeelding/, async () => {
    await expect(ConstructionWorkScreen.middenwegProjectCard).toBeVisible()
  })

  and(/een titel van het project/, async () => {
    await expect(ConstructionWorkScreen.middenwegProjectCardTitle).toBeVisible()
  })

  and(/een ondertitel met een korte beschrijving van het project/, async () => {
    await expect(
      ConstructionWorkScreen.middenwegProjectCardSubtitle,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.middenwegProjectCardSubtitle,
    ).toHaveLabel('Middenweg, Groot onderhoud')
  })

  when(/ik klik op het zoekveld/, async () => {
    await expect(
      ConstructionWorkScreen.projectsNavigatorSearchField,
    ).toBeVisible()
    await ConstructionWorkScreen.projectsNavigatorSearchField.tap()
  })

  then(
    /wordt er een nieuw scherm 'Zoek in werkzaamheden' geopend/,
    async () => {
      await waitFor(ConstructionWorkScreen.headerTitle)
        .toBeVisible()
        .withTimeout(2000)
      await expect(ConstructionWorkScreen.headerTitle).toHaveText(
        'Zoek in werkzaamheden',
      )
    },
  )

  and(/wordt er een zoekveld getoond/, async () => {
    await expect(ConstructionWorkScreen.projectsTextSearchField).toBeVisible()
  })
  given(
    /ik ben op de de werkzaamheden detail pagina van project Middenweg/,
    async () => {
      await WelcomeScreen.tap()
      await HomeScreen.tapModule('Werkzaamheden')
      await ConstructionWorkScreen.middenwegProjectCard.tap()
      await expect(ConstructionWorkScreen.headerTitle).toHaveText('Middenweg')
    },
  )

  when(/ik klik op de terug knop/, async () => {
    await ConstructionWorkScreen.headerBackButton.tap()
  })

  then(/ik ben in het werkzaamheden scherm/, async () => {
    await expect(ConstructionWorkScreen.headerTitle).toHaveText('Werkzaamheden')
  })

  when(/ik klik op project Amstel/, async () => {
    await ConstructionWorkScreen.amstelProjectCard.tap()
  })

  then(/ik ben op het detailscherm van project Amstel/, async () => {
    await expect(ConstructionWorkScreen.headerTitle).toHaveText('Amstel')
  })

  then(/ik ben op het homescherm/, async () => {
    await expect(HomeScreen.constructionWorkModuleButton).toBeVisible()
  })

  and(/ik open het project Stadhouderskade/, async () => {
    await ConstructionWorkScreen.middenwegProjectCard.swipe('up', 'fast', 0.5)
    waitFor(ConstructionWorkScreen.stadhouderskadeProjectCard).toBeVisible(70)
    await new Promise(r => setTimeout(r, 1000)) //explicit timeout, otherwise swipe functionality doesn't work
    await ConstructionWorkScreen.stadhouderskadeProjectCard.tap()
    await waitFor(ConstructionWorkScreen.headerTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(ConstructionWorkScreen.headerTitle).toHaveText(
      'Stadhouderskade',
    )
  })

  when(/ik volg een project/, async () => {
    await expect(ConstructionWorkScreen.projectFollowButtonLabel).toHaveText(
      'Volgen',
    )
    await ConstructionWorkScreen.projectFollowButton.tap()
  })

  then(/het project krijgt de status 'volgend'/, async () => {
    await expect(ConstructionWorkScreen.projectFollowButtonLabel).toHaveText(
      'Volgend',
    )
    await ConstructionWorkScreen.headerBackButton.tap()
    await expect(ConstructionWorkScreen.headerTitle).toHaveText('Werkzaamheden')
    await ConstructionWorkScreen.bijlmerSportparkProjectCard.swipe(
      'down',
      'fast',
      1.0,
    )
    await waitFor(ConstructionWorkScreen.stadhouderskadeProjectCard)
      .toBeVisible()
      .withTimeout(2000)
    await expect(
      ConstructionWorkScreen.projectFollowingTraitLabel,
    ).toBeVisible()
    await expect(ConstructionWorkScreen.projectFollowingTraitIcon).toBeVisible()
  })

  when(/ik ontvolg een project/, async () => {
    await ConstructionWorkScreen.stadhouderskadeProjectCard.tap()
    await waitFor(ConstructionWorkScreen.headerTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(ConstructionWorkScreen.headerTitle).toHaveText(
      'Stadhouderskade',
    )
    await expect(ConstructionWorkScreen.projectFollowButtonLabel).toHaveText(
      'Volgend',
    )
    await ConstructionWorkScreen.projectFollowButton.tap()
  })

  then(/de status 'volgend' verdwijnt/, async () => {
    await expect(ConstructionWorkScreen.projectFollowButtonLabel).toHaveText(
      'Volgen',
    )
    await ConstructionWorkScreen.headerBackButton.tap()
    await expect(ConstructionWorkScreen.headerTitle).toHaveText('Werkzaamheden')
    await expect(
      ConstructionWorkScreen.stadhouderskadeProjectCard,
    ).not.toBeVisible()
    await expect(
      ConstructionWorkScreen.projectFollowingTraitLabel,
    ).not.toBeVisible()
    await expect(
      ConstructionWorkScreen.projectFollowingTraitIcon,
    ).not.toBeVisible()
  })

  given(
    /ik ben op het projectdetailscherm van project 'Amstel III'/,
    async () => {
      await WelcomeScreen.tap()
      await HomeScreen.tapModule('Werkzaamheden')
      await expect(ConstructionWorkScreen.headerTitle).toHaveText(
        'Werkzaamheden',
      )
      await ConstructionWorkScreen.projectsNavigatorSearchField.tap()
      await ConstructionWorkScreen.projectsTextSearchField.typeText(
        'Amstel III',
      )
      await ConstructionWorkScreen.projectsTextSearchField.tapReturnKey()
      await ConstructionWorkScreen.amstelIIIProjectCard.tap()
      await waitFor(ConstructionWorkScreen.projectImage)
        .toBeVisible()
        .withTimeout(2000)
      await expect(ConstructionWorkScreen.headerTitle).toHaveText('Amstel III')
    },
  )

  then(/ik zie een afbeelding/, async () => {
    await expect(ConstructionWorkScreen.projectImage).toBeVisible()
  })

  then(/Een volgen knop/, async () => {
    await expect(ConstructionWorkScreen.projectFollowButton).toBeVisible()
  })

  then(/Het aantal volgers/, async () => {
    await expect(ConstructionWorkScreen.projectFollowersNumber).toBeVisible()

    await expect(ConstructionWorkScreen.projectFollowersText).toBeVisible()
  })

  then(/Een titel van het project/, async () => {
    await expect(ConstructionWorkScreen.projectTitle).toBeVisible()
    await expect(ConstructionWorkScreen.projectTitle).toHaveText('Amstel III')
  })

  then(/Een subtitel met korte uitleg over het project/, async () => {
    await expect(ConstructionWorkScreen.projectSubtitle).toBeVisible()
    await expect(ConstructionWorkScreen.projectSubtitle).toHaveText(
      'Ontwikkeling woongebied gemixt met werken',
    )
  })

  then(/Een link naar 'Over dit project'/, async () => {
    await expect(ConstructionWorkScreen.projectFollowButton).toBeVisible()
  })

  then(/Een link naar 'Contact'/, async () => {
    await expect(ConstructionWorkScreen.projectFollowButton).toBeVisible()
  })

  then(/Een nieuwsoverzicht met titel Nieuws/, async () => {
    await expect(ConstructionWorkScreen.projectArticlesTitle).toBeVisible()
    await expect(ConstructionWorkScreen.projectArticlesTitle).toHaveText(
      'Nieuws',
    )
  })

  then(/Een datum van het nieuwsbericht/, async () => {
    await ConstructionWorkScreen.projectArticlesTitle.swipe('up', 'fast', 0.2)
    await expect(
      ConstructionWorkScreen.projectAmstelIIIArticlePreviewDate,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.projectAmstelIIIArticlePreviewDate,
    ).toHaveText('3 januari')
  })

  then(/Een titel van het nieuwsbericht/, async () => {
    await expect(
      ConstructionWorkScreen.projectAmstelIIIArticlePreviewTitle,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.projectAmstelIIIArticlePreviewTitle,
    ).toHaveText('Happy NY 2')
  })

  then(/Een afbeelding bij het nieuwsbericht/, async () => {
    await expect(
      ConstructionWorkScreen.projectAmstelIIIArticlePreviewImage,
    ).toBeVisible()
  })
}

autoBindSteps(features, [constructionWorkSteps])
