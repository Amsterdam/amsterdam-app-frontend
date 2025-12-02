import {
  OrientationBasedLayout,
  type OrientationBasedLayoutProps,
} from '@/components/ui/containers/OrientationBasedLayout'
import {LayoutOrientation} from '@/components/ui/types'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useDeviceContext} from '@/hooks/useDeviceContext'

type Props = {
  alwaysDisplayAsRowForScreenReader?: boolean
} & Omit<OrientationBasedLayoutProps, 'orientation'>

export const Track = ({
  alwaysDisplayAsRowForScreenReader = false,
  ...props
}: Props) => {
  const {isPortrait} = useDeviceContext()
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  const orientation =
    isPortrait || (isScreenReaderEnabled && !alwaysDisplayAsRowForScreenReader)
      ? LayoutOrientation.vertical
      : LayoutOrientation.horizontal

  return (
    <OrientationBasedLayout
      orientation={orientation}
      {...props}
    />
  )
}
