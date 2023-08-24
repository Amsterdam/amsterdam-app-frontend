import {useSelector} from '@/hooks/redux/useSelector'
import {selectLocationTypePerModule} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'

export const useLocationTypeForModule = (slug: ModuleSlug) =>
  useSelector(selectLocationTypePerModule)?.[slug]
