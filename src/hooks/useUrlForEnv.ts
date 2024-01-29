import {EnvUrlMap, Environment} from '@/environment'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectEnvironment} from '@/store/slices/environment'

export const useUrlForEnv = (urlEnvMap: EnvUrlMap): string => {
  const {environment} = useSelector(selectEnvironment)

  return urlEnvMap[environment] ?? urlEnvMap[Environment.production] ?? ''
}
