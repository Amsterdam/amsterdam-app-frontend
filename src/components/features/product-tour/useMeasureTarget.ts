import {useIsFocused} from '@react-navigation/core'
import {useCallback, useEffect, useState} from 'react'
import {LayoutRectangle, useWindowDimensions, View} from 'react-native'
import {measureElement} from '@/components/features/product-tour/utils'

type TargetRef = React.RefObject<View | null>

export const useMeasureTarget = (targetRef: TargetRef) => {
  const isFocused = useIsFocused()
  const windowDimensions = useWindowDimensions()
  const [layout, setLayout] = useState<LayoutRectangle>()

  const measureTarget = useCallback(() => {
    if (!isFocused) {
      return
    }

    void measureElement(targetRef.current as unknown as View).then(
      ({x, y, width, height}) => {
        if (x === 0 && y === 0 && width === 0 && height === 0) {
          setTimeout(measureTarget, 500)
        } else {
          setLayout({x, y, width, height})
        }
      },
    )
  }, [isFocused, targetRef])

  useEffect(measureTarget, [isFocused, measureTarget, windowDimensions])

  return {layout, measureTarget}
}
