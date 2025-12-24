import {type Features, featureFlags} from '@/constants/featureFlags'
import {Environment} from '@/environment'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectEnvironment} from '@/store/slices/environment'

/**
 * Hook that returns the status of a feature flag if set, otherwise returns true in development environment.
 */
export const useFeatureFlag = (feature: Features): boolean => {
  const {environment} = useSelector(selectEnvironment)

  if (typeof featureFlags[feature] === 'boolean') {
    return featureFlags[feature]
  }

  return environment === Environment.development
}
