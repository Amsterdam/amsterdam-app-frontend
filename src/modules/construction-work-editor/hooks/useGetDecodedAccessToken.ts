import {useMemo} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectConstructionWorkEditorAccessToken} from '@/modules/construction-work-editor/slice'
import {DecodedJwtToken} from '@/modules/construction-work-editor/types'
import {decryptToken} from '@/modules/construction-work-editor/utils/token'

export const useGetDecodedAccessToken = (): DecodedJwtToken | undefined => {
  const token = useSelector(selectConstructionWorkEditorAccessToken)

  return useMemo(() => (token ? decryptToken(token) : undefined), [token])
}
