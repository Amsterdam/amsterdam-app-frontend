import {IconName} from '@/components/ui/media/iconPaths'
import {type TestProps} from '@/components/ui/types'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {RedirectKey} from '@/modules/redirects/types'

type RedirectResponse = {
  iconName: IconName
  routeName?: RedirectsRouteName
  text: string
  title: string
  urlKey?: RedirectKey
} & TestProps

export const redirects: RedirectResponse[] = [
  {
    iconName: 'car',
    testID: 'RedirectsParkingButton',
    text: 'Alles over parkeren en verkeer in de stad.',
    title: 'Parkeren',
    urlKey: RedirectKey.parking,
  },
  {
    iconName: 'login',
    testID: 'RedirectsParkingStartStopButton',
    text: 'Bezoekers- of kraskaart-vergunning? Geef hier parkeertijd van uw bezoek door.',
    title: 'Parkeertijd bezoek doorgeven',
    urlKey: RedirectKey.parking_visitors,
  },
  {
    iconName: 'document-text',
    testID: 'RedirectsDeedsAndStatementsButton',
    text: 'Geboorte-, huwelijks- en andere akten, uittreksel, VOG.',
    title: 'Akten, uittreksels en verklaringen',
    urlKey: RedirectKey.documents,
  },
  {
    iconName: 'housing',
    testID: 'RedirectsMoveButton',
    text: 'Naar en binnen Amsterdam.',
    title: 'Verhuizing doorgeven',
    urlKey: RedirectKey.relocation,
  },
  {
    iconName: 'person-desk',
    routeName: RedirectsRouteName.selectCity,
    testID: 'RedirectsMakeAppointmentButton',
    text: 'Bekijk voor welke onderwerpen u een afspraak kunt maken.',
    title: 'Afspraak maken op Stadsloket',
  },
  {
    iconName: 'collaborate',
    testID: 'RedirectsLowIncomeAidButton',
    text: 'Regelingen bij laag inkomen / Pak je kans.',
    title: 'Hulp bij een laag inkomen',
    urlKey: RedirectKey.income_help,
  },
  {
    iconName: 'city-pass',
    testID: 'RedirectsCityPassButton',
    text: 'Voor Amsterdammers met een laag inkomen.',
    title: 'Stadspas',
    urlKey: RedirectKey.citypass,
  },
  {
    iconName: 'vote',
    testID: 'RedirectsElectionsButton',
    text: 'Meer informatie over de verkiezingen voor het Europees Parlement en referendum Hoofdgroenstructuur op donderdag 6 juni.',
    title: 'Verkiezingen',
    urlKey: RedirectKey.elections,
  },
]
