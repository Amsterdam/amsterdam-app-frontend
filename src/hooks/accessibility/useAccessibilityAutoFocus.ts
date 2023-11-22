import {useFocusEffect} from '@react-navigation/core'
import {Component, useCallback, useLayoutEffect, useState} from 'react'
import {Platform} from 'react-native'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {Duration} from '@/types/duration'
import {focusOnElement} from '@/utils/accessibility/focusOnElement'

type UseAccessibilityFocusProps = {
  isActive?: boolean
  platform?: 'ios' | 'android'
}

export const useAccessibilityAutoFocus = <T extends Component>({
  isActive = true,
  platform,
}: UseAccessibilityFocusProps = {}) => {
  const dispatch = useDispatch()
  const [focusRef, setFocusRef] = useState<Component<T>>()

  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const [isFocus, setIsFocus] = useState(false)
  const [isLayoutUpdated, setIsLayoutUpdated] = useState(false)

  useLayoutEffect(() => {
    setIsLayoutUpdated(true)

    return () => {
      setIsLayoutUpdated(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      setIsFocus(true)

      return () => {
        setIsFocus(false)
      }
    }, []),
  )

  useLayoutEffect(() => {
    if (platform && Platform.OS !== platform) {
      return
    }

    if (
      !focusRef ||
      !isActive ||
      !isFocus ||
      !isLayoutUpdated ||
      !isScreenReaderEnabled
    ) {
      return
    }

    // Call focus as soon as all considition is met
    focusOnElement(focusRef)

    // Attempt to call it again just in case AccessibilityInfo.setAccessibilityFocus is delayed
    const timeoutId = setTimeout(() => {
      focusOnElement(focusRef)
    }, Duration.normal)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [
    dispatch,
    focusRef,
    isActive,
    isFocus,
    isLayoutUpdated,
    isScreenReaderEnabled,
    platform,
  ])

  return useCallback(
    (ref: Component) => {
      if (ref && !focusRef) {
        setFocusRef(ref as Component<T>)
      }
    },
    [focusRef],
  )
}
