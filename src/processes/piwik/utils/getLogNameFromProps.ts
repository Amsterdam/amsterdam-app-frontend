import {TestProps} from '@/components/ui/types'

export const getLogNameFromProps = (
  props: {logName?: string; 'sentry-label'?: string} & TestProps,
) => props.logName ?? props['sentry-label'] ?? props.testID
