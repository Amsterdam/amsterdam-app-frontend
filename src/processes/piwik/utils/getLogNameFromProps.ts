import {TestProps} from '@/components/ui/types'
import {devError} from '@/processes/development'

export const getLogNameFromProps = (
  props: {logName?: string; 'sentry-label'?: string} & TestProps,
) => {
  const name = props.logName ?? props['sentry-label'] ?? props.testID

  if (!name) {
    devError('No name found in props')
  }

  return name
}
