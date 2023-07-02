import {AddressState} from '@/modules/address/slice'
import {ConstructionWorkState} from '@/modules/construction-work/slice'
import {MessageDraftState} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorState} from '@/modules/construction-work-editor/slice'
import {ContactState} from '@/modules/contact/slice'
import {WasteGuideState} from '@/modules/waste-guide/slice'
import {baseApi} from '@/services/init'
import {AlertState} from '@/store/alertSlice'
import {AuthState} from '@/store/authSlice'
import {BottomSheetState} from '@/store/bottomSheetSlice'
import {EnvironmentState} from '@/store/environmentSlice'
import {ModulesState} from '@/store/modulesSlice'
import {ReduxKey} from '@/store/types/reduxKeys'
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
  [ReduxKey.theme]: ThemeState
  [ReduxKey.wasteGuide]: WasteGuideState
}
