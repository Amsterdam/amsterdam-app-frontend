import {CityPassSurveyBottomSheetContent} from '@/modules/city-pass/bottomsheet/CityPassSurveyBottomSheetContent'
import {CityPassBottomSheetVariant} from '@/modules/city-pass/bottomsheet/bottomsheetVariants'
import {CityPassActionButton} from '@/modules/city-pass/components/CityPassActionButton'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {cityPassSlice, CityPassState} from '@/modules/city-pass/slice'
import {logout} from '@/modules/city-pass/utils/logout'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof CityPassState)[] = [
  'isCityPassOwnerRegistered',
  'accessTokenExpiration',
  'refreshTokenExpiration',
  'isAutomaticLogoutAlertDismissed',
]

export const cityPassModule: ModuleClientConfig = {
  ActionButton: CityPassActionButton,
  linking: {
    [CityPassRouteName.loginSteps]:
      'stadspas/:loginResult/:accessToken?/:refreshToken?/:errorMessage?/:errorCode?',
  },
  logDimension: PiwikSessionDimension.cityPassModule,
  logout: dispatch => logout(false, dispatch),
  name: 'CityPassModule',
  reduxConfigs: [
    {
      key: ReduxKey.cityPass,
      slice: cityPassSlice,
      persistVersion: 0,
      persistWhitelist,
    },
  ],
  requiresFirebaseToken: true,
  slug: ModuleSlug['city-pass'],
  bottomSheetVariantsHome: {
    [CityPassBottomSheetVariant.survey]: CityPassSurveyBottomSheetContent,
  },
}
