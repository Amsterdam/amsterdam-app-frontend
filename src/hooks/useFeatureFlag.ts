import {type Features, featureFlags} from '@/constants/featureFlags'
import {Environment} from '@/environment'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectEnvironment} from '@/store/slices/environment'

/**
 * Hook that returns the status of a feature flag.
 * Will also return true in the development environment.
 */
export const useFeatureFlag = (feature: Features): boolean => {
  const {environment} = useSelector(selectEnvironment)

  return environment === Environment.development || featureFlags[feature]
}
