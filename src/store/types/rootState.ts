import {AddressState} from '@/modules/address/slice'
import {ConstructionWorkState} from '@/modules/construction-work/slice'
import {MessageDraftState} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorState} from '@/modules/construction-work-editor/slice'
import {ContactState} from '@/modules/contact/slice'
import {OnboardingState} from '@/modules/onboarding/slice'
import {WasteGuideState} from '@/modules/waste-guide/slice'
import {baseApi} from '@/services/init'
import {AlertState} from '@/store/slices/alert'
import {AuthState} from '@/store/slices/auth'
import {BottomSheetState} from '@/store/slices/bottomSheet'
import {EnvironmentState} from '@/store/slices/environment'
import {ModulesState} from '@/store/slices/modules'
import {ProductTourState} from '@/store/slices/product-tour.slice'
import {ReduxKey} from '@/store/types/reduxKey'
import {ThemeState} from '@/themes/slice'

export type RootState = {
  [baseApi.reducerPath]: typeof baseApi.reducer
  [ReduxKey.address]: AddressState
  [ReduxKey.alert]: AlertState
  [ReduxKey.auth]: AuthState
  [ReduxKey.bottomSheet]: BottomSheetState
  [ReduxKey.constructionWork]: ConstructionWorkState
  [ReduxKey.constructionWorkEditor]: ConstructionWorkEditorState
  [ReduxKey.contact]: ContactState
  [ReduxKey.environment]: EnvironmentState
  [ReduxKey.messageDraft]: MessageDraftState
  [ReduxKey.modules]: ModulesState
  [ReduxKey.onboarding]: OnboardingState
  [ReduxKey.productTour]: ProductTourState
  [ReduxKey.theme]: ThemeState
  [ReduxKey.wasteGuide]: WasteGuideState
}
