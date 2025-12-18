import {Column, type ColumnProps} from '@/components/ui/layout/Column'
import {Row, type RowProps} from '@/components/ui/layout/Row'
import {LayoutOrientation} from '@/components/ui/types'

export type OrientationBasedLayoutProps = {
  orientation: LayoutOrientation
} & ColumnProps &
  RowProps

export const OrientationBasedLayout = ({
  orientation,
  ...props
}: OrientationBasedLayoutProps) =>
  orientation === LayoutOrientation.horizontal ? (
    <Row
      gutter="sm"
      {...props}
    />
  ) : (
    <Column
      gutter="md"
      {...props}
    />
  )
