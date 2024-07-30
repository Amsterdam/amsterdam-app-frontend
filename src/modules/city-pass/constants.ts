import {AboutBlock} from '@/modules/city-pass/types'
import {RedirectKey} from '@/modules/redirects/types'

export const DEFAULT_PASS_WIDTH = 312
export const CITY_PASS_HEIGHT = 550
export const NEXT_CARD_VISIBLE_FRACTION_Of_AVAILABLE_SPACE = 0.33

export const aboutBlocks: AboutBlock[] = [
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
