import {Column, ColumnProps} from '@/components/ui/layout/Column'
import {Row, RowProps} from '@/components/ui/layout/Row'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Common} from '@/types/utils'

type TrackProps = {
  alwaysDisplayAsRowForScreenReader?: boolean
} & Common<ColumnProps, RowProps>

/**
 *  Renders a column on a device in portrait mode, or a row on a device in landscape mode.
 *
 *  On a device with a screen reader enabled, it will always render a column.
 *  This prevents the content from being read out in an incorrect order.
 *
 *  Props shared by both {@link Column} and {@link Row} can be passed to this component.
 *
 *  @example <Track gutter="lg">…</Track>
 */
export const Track = ({
  children,
  alwaysDisplayAsRowForScreenReader = false,
  ...props
}: TrackProps) => {
  const {isPortrait} = useDeviceContext()
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  if (
    isPortrait ||
    (isScreenReaderEnabled && !alwaysDisplayAsRowForScreenReader)
  ) {
    return <Column {...props}>{children}</Column>
  }

  return <Row {...props}>{children}</Row>
}
