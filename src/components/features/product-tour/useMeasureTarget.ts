import {useIsFocused} from '@react-navigation/native'
import {type RefObject, useCallback, useEffect, useRef, useState} from 'react'
import {LayoutRectangle, useWindowDimensions, View} from 'react-native'
import {measureElement} from '@/components/features/product-tour/utils'
import {useDeviceContext} from '@/hooks/useDeviceContext'

type TargetRef = RefObject<View | null>

export const useMeasureTarget = (targetRef: TargetRef) => {
  const isFocused = useIsFocused()
  const windowDimensions = useWindowDimensions()
  const [layout, setLayout] = useState<LayoutRectangle>()
  const oldLayout = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const measureTarget = useCallback(() => {
    if (!isFocused || !targetRef.current) {
      return
    }

    void measureElement(targetRef.current).then(
      ({x, y, width, height}) => {
        if (x === 0 && y === 0 && width === 0 && height === 0) {
          setTimeout(measureTarget, 300)

          return
        }

        const layoutChanged =
          oldLayout.current.height !== height ||
          oldLayout.current.width !== width ||
          oldLayout.current.x !== x ||
          oldLayout.current.y !== y

        if (layoutChanged) {
          setTimeout(measureTarget, 300)
        } else {
          setLayout({x, y, width, height})
        }

        oldLayout.current = {x, y, width, height}
      },
      () => setTimeout(measureTarget, 200),
    )
  }, [isFocused, targetRef, oldLayout])

  const {isPortrait} = useDeviceContext()

  useEffect(() => {
    setLayout(undefined)
    setTimeout(measureTarget, 1000)
  }, [isPortrait, measureTarget, isFocused, windowDimensions])

  return {layout, measureTarget}
}
