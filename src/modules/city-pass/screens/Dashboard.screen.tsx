import {useCallback} from 'react'
import {Alert} from 'react-native'
import simplur from 'simplur'
import {Button} from '@/components/ui/buttons/Button'
import {InformationButton} from '@/components/ui/buttons/InformationButton'
import {Box} from '@/components/ui/containers/Box'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import SportsImage from '@/modules/city-pass/assets/sports.svg'
import {CityPassCard} from '@/modules/city-pass/components/CityPassCard'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {resetCityPass, showCityPasses} from '@/modules/city-pass/slice'
import {CityPass} from '@/modules/city-pass/types'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {RedirectKey} from '@/modules/redirects/types'
import {devLog} from '@/processes/development'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'

type AboutBlock = {
  icon: SvgIconName
  redirectKey: RedirectKey
  testID: string
  text: string
  title: string
}

const aboutBlocks: AboutBlock[] = [
  {
    icon: 'list',
    redirectKey: RedirectKey.citypass,
    title: 'Bekijk het aanbod',
    text: 'Gratis of met hoge korting sporten, naar de bioscoop, het theater, of het museum.',
    testID: 'CityPassOverviewLink',
  },
  {
    icon: 'child',
    redirectKey: RedirectKey.cityPassChildBudget,
    title: 'Over het kindtegoed',
    text: 'Kinderen tot en met 17 jaar krijgen Kindtegoed op hun Stadspas. ',
    testID: 'CityPassChildBudgetLink',
  },
  {
    icon: 'question-mark-circle',
    redirectKey: RedirectKey.cityPassUsage,
    title: 'Zo werkt je Stadspas',
    text: 'Lees meer over wat de Stadspas is en hoe het werkt.',
    testID: 'CityPassUsageLink',
  },
]

const cityPasses: CityPass[] = [
  {
    actief: true,
    eigenaar: 'Mirjam',
    balance_update_time: new Date('2020-04-02T12:45:41.000Z'),
    budgetten: [
      {
        code: 'AMSTEG_10-14',
        naam: 'Kindtegoed 10-14',
        omschrijving: 'Kindtegoed',
        expiry_date: new Date('2021-08-31T21:59:59.000Z'),
        budget_assigned: 150,
        budget_balance: 0,
      },
      {
        code: 'AMSTEG_06-30',
        naam: 'Kindtegoed 30-06',
        omschrijving: 'Kindtegoed',
        expiry_date: new Date('2021-08-31T21:59:59.000Z'),
        budget_assigned: 75,
        budget_balance: 0,
      },
    ],
    budgetten_actief: true,
    categorie: 'Amsterdamse Digitale Stadspas',
    categorie_code: 'A',
    expiry_date: new Date('2020-08-31T23:59:59.000Z'),
    id: 999999,
    originele_pas: {
      categorie: 'Amsterdamse Digitale Stadspas',
      categorie_code: 'A',
      id: 888888,
      pasnummer: 8888888888888,
      pasnummer_volledig: '8888888888888888888',
      passoort: {
        id: 11,
        naam: 'Digitale Stadspas',
      },
    },
    pasnummer: 6666666666666,
    pasnummer_volledig: '6666666666666666666',
    passoort: {
      id: 11,
      naam: 'Digitale Stadspas',
    },
  },
]

export const DashboardScreen = () => {
  const {navigate} = useNavigation()
  const {setAlert} = useAlert()
  const dispatch = useDispatch()
  const logout = useCallback(() => {
    devLog('login')
    dispatch(resetCityPass())
    setAlert({
      variant: AlertVariant.positive,
      text: 'Je Stadspas staat niet meer in de app. Je kunt je Stadspas altijd weer toevoegen door in te loggen.',
      title: 'Uitgelogd',
      hasIcon: true,
      hasCloseIcon: true,
      testID: 'CityPassLoggedOutAlert',
    })
  }, [dispatch, setAlert])
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

  const openRedirect = (redirectKey: RedirectKey) => {
    if (redirectUrls?.[redirectKey]) {
      openWebUrl(redirectUrls[redirectKey])
    } else {
      Alert.alert('Sorry, deze functie is niet beschikbaar.')
      trackException(ExceptionLogKey.redirectNotFound, 'Redirects.tsx', {
        urlKey: redirectKey,
      })
    }
  }

  return (
    <CityPassLoginBoundaryScreen
      hasStickyAlert
      testID="CityPassDashboardScreen">
      <Box
        insetBottom="xl"
        insetHorizontal="md"
        insetTop="md">
        {cityPasses.length === 0 ? (
          <>
            <Title text="Je hebt geen Stadspas" />
            <Gutter height="sm" />
            <Paragraph>
              De Stadspas is voor Amsterdammers met een laag inkomen en weinig
              vermogen. Bekijk of je recht hebt op een Stadspas.
            </Paragraph>
            <Gutter height="lg" />
            <Button
              accessibilityRole="link"
              label="Stadspas aanvragen"
              onPress={() => openRedirect(RedirectKey.cityPassRequest)}
              testID="CityPassRequestButton"
              variant="secondary"
            />
            <Gutter height="lg" />
            <Button
              label="Uitloggen"
              onPress={logout}
              testID="CityPassLogoutButton"
            />
          </>
        ) : (
          <Column gutter="md">
            <Button
              iconName="city-pass"
              label={simplur`Laat mijn [pas|passen] zien${[cityPasses.length]}`}
              onPress={() => {
                dispatch(showCityPasses())
              }}
              testID="CityPassLogoutButton"
            />
            <Gutter height="sm" />
            {cityPasses.map(({eigenaar, pasnummer}) => (
              <CityPassCard
                key={pasnummer}
                onPress={() =>
                  navigate(CityPassRouteName.cityPassDetails, {
                    passNumber: pasnummer,
                  })
                }
                testID={pasnummer.toString()}
                title={`Stadspas details van ${eigenaar}`}
              />
            ))}
          </Column>
        )}
      </Box>
      <Box
        insetHorizontal="md"
        insetVertical="xl"
        variant="city-pass">
        <Column gutter="lg">
          <Title
            color="inverse"
            text="Over de Stadspas"
          />
          {aboutBlocks.map(({icon, title, text, testID, redirectKey}) => (
            <InformationButton
              accessibilityRole="link"
              iconName={icon}
              key={title}
              onPress={() => openRedirect(redirectKey)}
              testID={testID}
              text={text}
              title={title}
              variant="inverse"
            />
          ))}
        </Column>
      </Box>
      <Box
        insetBottom="md"
        insetHorizontal="md"
        insetTop="xl">
        <Button
          label="Uitloggen"
          onPress={logout}
          testID="CityPassLogoutButton"
          variant="secondary"
        />
      </Box>

      <FigureWithFacadesBackground testID="CityPassStartImage">
        <SportsImage />
      </FigureWithFacadesBackground>
    </CityPassLoginBoundaryScreen>
  )
}
