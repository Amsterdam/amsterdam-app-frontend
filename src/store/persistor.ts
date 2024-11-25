import {persistStore} from 'redux-persist'
import {store} from '@/store/store'

export const persistor = persistStore(store)
