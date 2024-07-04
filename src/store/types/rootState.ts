import {ProductTourState} from '@/components/features/product-tour/slice'
import {AddressState} from '@/modules/address/types'
import {CityPassState} from '@/modules/city-pass/slice'
import {ConstructionWorkState} from '@/modules/construction-work/slice'
import {MessageDraftState} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorState} from '@/modules/construction-work-editor/slice'
import {ContactState} from '@/modules/contact/slice'
import {OnboardingState} from '@/modules/onboarding/slice'
import {WasteGuideState} from '@/modules/waste-guide/slice'
import {baseApi} from '@/services/baseApi'
import {AlertState} from '@/store/slices/alert'
import {BottomSheetState} from '@/store/slices/bottomSheet'
import {EnvironmentState} from '@/store/slices/environment'
import {ModulesState} from '@/store/slices/modules'
import {PermissionsState} from '@/store/slices/permissions'
import {UpdateState} from '@/store/slices/updateApp'
import {ReduxKey} from '@/store/types/reduxKey'
import {ThemeState} from '@/themes/slice'

export type RootState = {
  [baseApi.reducerPath]: typeof baseApi.reducer
  [ReduxKey.address]: AddressState
  [ReduxKey.alert]: AlertState
  [ReduxKey.bottomSheet]: BottomSheetState
  [ReduxKey.cityPass]: CityPassState
  [ReduxKey.constructionWork]: ConstructionWorkState
  [ReduxKey.constructionWorkEditor]: ConstructionWorkEditorState
  [ReduxKey.contact]: ContactState
  [ReduxKey.environment]: EnvironmentState
  [ReduxKey.messageDraft]: MessageDraftState
  [ReduxKey.modules]: ModulesState
  [ReduxKey.onboarding]: OnboardingState
  [ReduxKey.permissions]: PermissionsState
  [ReduxKey.productTour]: ProductTourState
  [ReduxKey.theme]: ThemeState
  [ReduxKey.updateApp]: UpdateState
  [ReduxKey.wasteGuide]: WasteGuideState
}
