import {createAddressFragment} from '@/modules/address/createAddressFragment'
import {ReduxKey} from '@/store/types/reduxKey'

/**
 * Register specific address augmented modules in this list in order to streamline usage of
 * module based addresses through the useModuleBasedSelectedAddress hook.
 */
export const moduleAddressFragments: Partial<
  Record<ReduxKey, ReturnType<typeof createAddressFragment>>
> = {
  [ReduxKey.wasteGuide]: createAddressFragment(ReduxKey.wasteGuide),
  [ReduxKey.burningGuide]: createAddressFragment(ReduxKey.burningGuide),
  [ReduxKey.constructionWork]: createAddressFragment(ReduxKey.constructionWork),
  [ReduxKey.parking]: createAddressFragment(ReduxKey.parking),
  [ReduxKey.elections]: createAddressFragment(ReduxKey.elections),
}
