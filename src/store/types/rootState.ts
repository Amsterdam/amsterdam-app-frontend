import {ProductTourState} from '@/components/features/product-tour/slice'
import {AccessCodeState} from '@/modules/access-code/slice'
import {AddressState} from '@/modules/address/types'
import {ChatState} from '@/modules/chat/slice'
import {CityPassState} from '@/modules/city-pass/slice'
import {ConstructionWorkState} from '@/modules/construction-work/slice'
import {MessageDraftState} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorState} from '@/modules/construction-work-editor/slice'
import {ContactState} from '@/modules/contact/slice'
import {OnboardingState} from '@/modules/onboarding/slice'
import {ParkingState} from '@/modules/parking/slice'
import {WasteGuideState} from '@/modules/waste-guide/slice'
import {baseApi} from '@/services/baseApi'
import {AlertState} from '@/store/slices/alert'
import {BottomSheetState} from '@/store/slices/bottomSheet'
import {EnvironmentState} from '@/store/slices/environment'
import {InternetConnectionState} from '@/store/slices/internetConnection'
import {MenuState} from '@/store/slices/menu'
import {ModulesState} from '@/store/slices/modules'
import {PermissionsState} from '@/store/slices/permissions'
import {ScreenState} from '@/store/slices/screen'
import {SecureStorageState} from '@/store/slices/secureStorage'
import {UpdateState} from '@/store/slices/updateApp'
import {ReduxKey} from '@/store/types/reduxKey'
import {ThemeState} from '@/themes/slice'

export type RootState = {
  [baseApi.reducerPath]: typeof baseApi.reducer
  [ReduxKey.accessCode]: AccessCodeState
  [ReduxKey.address]: AddressState
  [ReduxKey.alert]: AlertState
  [ReduxKey.bottomSheet]: BottomSheetState
  [ReduxKey.chat]: ChatState
  [ReduxKey.cityPass]: CityPassState
  [ReduxKey.constructionWork]: ConstructionWorkState
  [ReduxKey.constructionWorkEditor]: ConstructionWorkEditorState
  [ReduxKey.contact]: ContactState
  [ReduxKey.environment]: EnvironmentState
  [ReduxKey.internetConnection]: InternetConnectionState
  [ReduxKey.menu]: MenuState
  [ReduxKey.messageDraft]: MessageDraftState
  [ReduxKey.modules]: ModulesState
  [ReduxKey.onboarding]: OnboardingState
  [ReduxKey.parking]: ParkingState
  [ReduxKey.permissions]: PermissionsState
  [ReduxKey.productTour]: ProductTourState
  [ReduxKey.secureStorage]: SecureStorageState
  [ReduxKey.theme]: ThemeState
  [ReduxKey.screen]: ScreenState
  [ReduxKey.updateApp]: UpdateState
  [ReduxKey.wasteGuide]: WasteGuideState
}
