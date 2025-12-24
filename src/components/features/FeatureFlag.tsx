import type {Features} from '@/constants/featureFlags'
import {useFeatureFlag} from '@/hooks/useFeatureFlag'

type Props = {
  children: React.ReactNode
  fallback?: React.ReactNode
  feature: Features
}

/**
 * Component that conditionally renders its children based on the status of a feature flag.
 * Will also render the children in the development environment.
 */
export const FeatureFlag = ({children, feature, fallback = null}: Props) => {
  const isEnabled = useFeatureFlag(feature)

  if (!isEnabled) {
    return fallback
  }

  return children
}
