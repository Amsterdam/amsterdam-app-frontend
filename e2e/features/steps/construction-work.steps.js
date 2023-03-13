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
    await WelcomeScreen.tapWelcomeScreen()
    await HomeScreen.tapModule('Werkzaamheden')
  })

  then(/de werkzaamheden worden weergegeven met een afbeelding/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkCardProjectMiddenweg,
    ).toBeVisible()
  })

  and(/een titel van het project/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkCardProjectTextTitleMiddenweg,
    ).toBeVisible()
  })

  and(/een ondertitel met een korte beschrijving van het project/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkCardProjectTextSubtitleMiddenweg,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.ConstructionWorkCardProjectTextSubtitleMiddenweg,
    ).toHaveLabel('Middenweg, Groot onderhoud')
  })

  when(/ik klik op het zoekveld/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkNavigatorSearchField,
    ).toBeVisible()
    await ConstructionWorkScreen.ConstructionWorkNavigatorSearchField.tap()
  })

  then(
    /wordt er een nieuw scherm 'Zoek in werkzaamheden' geopend/,
    async () => {
      await waitFor(ConstructionWorkScreen.HeaderTitle)
        .toBeVisible()
        .withTimeout(2000)
      await expect(ConstructionWorkScreen.HeaderTitle).toHaveText(
        'Zoek in werkzaamheden',
      )
    },
  )

  and(/wordt er een zoekveld getoond/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectsTextSearchField,
    ).toBeVisible()
  })
  given(
    /ik ben op de de werkzaamheden detail pagina van project Middenweg/,
    async () => {
      await WelcomeScreen.tapWelcomeScreen()
      await HomeScreen.tapModule('Werkzaamheden')
      await ConstructionWorkScreen.ConstructionWorkCardProjectMiddenweg.tap()
      await expect(ConstructionWorkScreen.HeaderTitle).toHaveText('Middenweg')
    },
  )

  when(/ik klik op de terug knop/, async () => {
    await ConstructionWorkScreen.HeaderButtonBack.tap()
  })

  then(/ik ben in het werkzaamheden scherm/, async () => {
    await expect(ConstructionWorkScreen.HeaderTitle).toHaveText('Werkzaamheden')
  })

  when(/ik klik op project Amstel/, async () => {
    await ConstructionWorkScreen.ConstructionWorkCardProjectAmstel.tap()
  })

  then(/ik ben op het detailscherm van project Amstel/, async () => {
    await expect(ConstructionWorkScreen.HeaderTitle).toHaveText('Amstel')
  })

  then(/ik ben op het homescherm/, async () => {
    await expect(HomeScreen.constructionWorkModuleButton).toBeVisible()
  })

  and(/ik open het project Stadhouderskade/, async () => {
    await ConstructionWorkScreen.ConstructionWorkCardProjectMiddenweg.swipe(
      'up',
      'fast',
      0.5,
    )
    waitFor(
      ConstructionWorkScreen.ConstructionWorkCardProjectStadhouderskade,
    ).toBeVisible(70)
    await new Promise(r => setTimeout(r, 1000)) //explicit timeout, otherwise swipe functionality doesn't work
    await ConstructionWorkScreen.ConstructionWorkCardProjectStadhouderskade.tap()
    await waitFor(ConstructionWorkScreen.HeaderTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(ConstructionWorkScreen.HeaderTitle).toHaveText(
      'Stadhouderskade',
    )
  })

  when(/ik volg een project/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowButtonLabel,
    ).toHaveText('Volgen')
    await ConstructionWorkScreen.ConstructionWorkProjectFollowButton.tap()
  })

  then(/het project krijgt de status 'volgend'/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowButtonLabel,
    ).toHaveText('Volgend')
    await ConstructionWorkScreen.HeaderButtonBack.tap()
    await expect(ConstructionWorkScreen.HeaderTitle).toHaveText('Werkzaamheden')
    await ConstructionWorkScreen.ConstructionWorkCardProjectBijlmerSportpark.swipe(
      'down',
      'fast',
      1.0,
    )
    await waitFor(
      ConstructionWorkScreen.ConstructionWorkCardProjectStadhouderskade,
    )
      .toBeVisible()
      .withTimeout(2000)
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectTraitFollowingLabel,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectTraitFollowingIcon,
    ).toBeVisible()
  })

  when(/ik ontvolg een project/, async () => {
    await ConstructionWorkScreen.ConstructionWorkCardProjectStadhouderskade.tap()
    await waitFor(ConstructionWorkScreen.HeaderTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(ConstructionWorkScreen.HeaderTitle).toHaveText(
      'Stadhouderskade',
    )
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowButtonLabel,
    ).toHaveText('Volgend')
    await ConstructionWorkScreen.ConstructionWorkProjectFollowButton.tap()
  })

  then(/de status 'volgend' verdwijnt/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowButtonLabel,
    ).toHaveText('Volgen')
    await ConstructionWorkScreen.HeaderButtonBack.tap()
    await expect(ConstructionWorkScreen.HeaderTitle).toHaveText('Werkzaamheden')
    await expect(
      ConstructionWorkScreen.ConstructionWorkCardProjectStadhouderskade,
    ).not.toBeVisible()
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectTraitFollowingLabel,
    ).not.toBeVisible()
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectTraitFollowingIcon,
    ).not.toBeVisible()
  })

  given(
    /ik ben op het projectdetailscherm van project 'Amstel' III/,
    async () => {
      await WelcomeScreen.tapWelcomeScreen()
      await HomeScreen.tapModule('Werkzaamheden')
      await expect(ConstructionWorkScreen.HeaderTitle).toHaveText(
        'Werkzaamheden',
      )
      await ConstructionWorkScreen.ConstructionWorkNavigatorSearchField.tap()
      await ConstructionWorkScreen.ConstructionWorkProjectsTextSearchField.typeText(
        'Amstel III',
      )
      await ConstructionWorkScreen.ConstructionWorkProjectsTextSearchField.tapReturnKey()
      await ConstructionWorkScreen.ConstructionWorkCardProjectAmstelIII.tap()
      await waitFor(ConstructionWorkScreen.ConstructionWorkProjectImage)
        .toBeVisible()
        .withTimeout(2000)
      await expect(ConstructionWorkScreen.HeaderTitle).toHaveText('Amstel III')
    },
  )

  then(/ik zie een afbeelding/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectImage,
    ).toBeVisible()
  })

  then(/Een volgen knop/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowButton,
    ).toBeVisible()
  })

  then(/Het aantal volgers/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowersNumber,
    ).toBeVisible()

    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowersText,
    ).toBeVisible()
  })

  then(/Een titel van het project/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectTitle,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectTitle,
    ).toHaveText('Amstel III')
  })

  then(/Een subtitel met korte uitleg over het project/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectSubtitle,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectSubtitle,
    ).toHaveText('Ontwikkeling woongebied gemixt met werken')
  })

  then(/Een link naar 'Over dit project'/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowButton,
    ).toBeVisible()
  })

  then(/Een link naar 'Contact'/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowButton,
    ).toBeVisible()
  })

  then(/Een nieuwsoverzicht met titel Nieuws/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectArticlesTitle,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectArticlesTitle,
    ).toHaveText('Nieuws')
  })

  then(/Een datum van het nieuwsbericht/, async () => {
    await ConstructionWorkScreen.ConstructionWorkProjectArticlesTitle.swipe(
      'up',
      'fast',
      0.2,
    )
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectArticleAmstelIIIDate,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectArticleAmstelIIIDate,
    ).toHaveText('3 januari')
  })

  then(/Een titel van het nieuwsbericht/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectArticleAmstelIIIPreviewTitle,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectArticleAmstelIIIPreviewTitle,
    ).toHaveText('Happy NY 2')
  })

  then(/Een afbeelding bij het nieuwsbericht/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectArticleAmstelIIIPreviewImage,
    ).toBeVisible()
  })
}

autoBindSteps(features, [constructionWorkSteps])
