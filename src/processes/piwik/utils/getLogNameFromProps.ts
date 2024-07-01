import {type TestProps} from '@/components/ui/types'
import {devError} from '@/processes/development'

export const getLogNameFromProps = (
  props: {logName?: string; 'logging-label'?: string} & Partial<TestProps>,
) => {
  const name = props.logName ?? props['logging-label'] ?? props.testID

  if (!name) {
    devError('No name found in props')
  }

  return name
}
