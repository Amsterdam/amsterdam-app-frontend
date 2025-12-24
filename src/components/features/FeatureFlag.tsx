import type {Features} from '@/constants/featureFlags'
import {useFeatureFlag} from '@/hooks/useFeatureFlag'

type Props = {
  children: React.ReactNode
  fallback?: React.ReactNode
  feature: Features
}

/**
 * Component that returns the children if a feature flag is set and true or if the feature flag is not set and in the development environment.
 * Otherwise, it returns the fallback component or null.
 */
export const FeatureFlag = ({children, feature, fallback = null}: Props) => {
  const isEnabled = useFeatureFlag(feature)

  if (!isEnabled) {
    return fallback
  }

  return children
}
