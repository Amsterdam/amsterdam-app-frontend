import {SvgIconName} from '@/components/ui/media/svgIcons'
import {type TestProps} from '@/components/ui/types'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {RedirectKey} from '@/modules/redirects/types'

type RedirectResponse = {
  iconName: SvgIconName
  routeName?: RedirectsRouteName
  text: string
  title: string
  urlKey?: RedirectKey
} & TestProps

export const redirects: RedirectResponse[] = [
  {
    iconName: 'redirectsSail',
    testID: 'RedirectsSailButton',
    text: 'Ga in 3 stappen voorbereid het water op om recreatief te varen tijdens SAIL 2025!',
    title: 'Varen tijdens SAIL ',
    urlKey: RedirectKey.sail,
  },
  {
    iconName: 'vote',
    testID: 'RedirectsElectionsButton',
    text: 'Meer informatie over de Tweede Kamerverkiezingen op woensdag 29 oktober.',
    title: 'Verkiezingen',
    urlKey: RedirectKey.elections,
  },
  {
    iconName: 'car',
    testID: 'RedirectsParkingButton',
    text: 'Alles over parkeren en verkeer in de stad.',
    title: 'Parkeren',
    urlKey: RedirectKey.parking,
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
    iconName: 'redirectsSail',
    testID: 'RedirectsSailingAndMooringButton',
    text: 'Koop een vaarvignet als u met uw boot in Amsterdam en Weesp wilt varen of afmeren.',
    title: 'Vignet voor varen en afmeren',
    urlKey: RedirectKey.sailingAndMooring,
  },
]
