import {ReactNode} from 'react'
import {View, StyleSheet, LayoutRectangle} from 'react-native'
import {Triangle} from '@/components/ui/feedback/Triangle'
import {PointerDimension} from '@/components/ui/feedback/tooltip/types'
import {Center} from '@/components/ui/layout/Center'
import {Direction, Placement} from '@/components/ui/types'
import {mapPlacementToDirection} from '@/components/ui/utils/mapPlacementToDirection'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const getPointerPositionX = (layout?: LayoutRectangle) => {
  if (!layout) {
    return 0
  }

  return layout.x + layout.width / 2
}

type Props = {
  placement: Placement
  productTourTipTargetLayout?: LayoutRectangle
}

type WrapperProps = {
  children: ReactNode
  direction: Direction
  productTourTipTargetLayout?: LayoutRectangle
}

const Wrapper = ({
  children,
  direction,
  productTourTipTargetLayout,
}: WrapperProps) =>
  direction === Direction.left ||
  direction === Direction.right ||
  !productTourTipTargetLayout ? (
    <Center>{children}</Center>
  ) : (
    <>{children}</>
  )

export const Pointer = ({placement, productTourTipTargetLayout}: Props) => {
  const direction = mapPlacementToDirection(placement)
  const styles = useThemable(
    createStyles(getPointerPositionX(productTourTipTargetLayout)),
  )

  return (
    <Wrapper
      direction={direction}
      productTourTipTargetLayout={productTourTipTargetLayout}>
      <View style={styles.pointer}>
        <Triangle direction={direction} />
      </View>
    </Wrapper>
  )
}

const createStyles =
  (positionX: number) =>
  ({size}: Theme) =>
    StyleSheet.create({
      pointer: {
        marginLeft: positionX
          ? positionX - PointerDimension.width / 2 - size.spacing.xl
          : undefined,
      },
    })
