import {useContext} from 'react'
import {Column, ColumnProps} from '@/components/ui/layout/Column'
import {Row, RowProps} from '@/components/ui/layout/Row'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {DeviceContext} from '@/providers/device.provider'
import {Common} from '@/utils/types'

type TrackProps = Common<ColumnProps, RowProps>

export const Track = ({children, ...props}: TrackProps) => {
  const {isPortrait} = useContext(DeviceContext)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  if (isPortrait || isScreenReaderEnabled) {
    return <Column {...props}>{children}</Column>
  }

  return <Row {...props}>{children}</Row>
}
