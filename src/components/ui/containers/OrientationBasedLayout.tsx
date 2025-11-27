import {Column, type ColumnProps} from '@/components/ui/layout/Column'
import {Row, type RowProps} from '@/components/ui/layout/Row'
import {LayoutOrientation} from '@/components/ui/types'

type Props = {
  orientation: LayoutOrientation
} & ColumnProps &
  RowProps

export const OrientationBasedLayout = ({orientation, ...props}: Props) =>
  orientation === LayoutOrientation.horizontal ? (
    <Row {...props} />
  ) : (
    <Column {...props} />
  )
