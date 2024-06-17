import {useFocusEffect} from '@react-navigation/core'
import {Component, useCallback, useLayoutEffect, useRef, useState} from 'react'
import {Platform} from 'react-native'
import {useFocusOnElement} from '@/hooks/accessibility/useFocusOnElement'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {Duration} from '@/types/duration'

type UseAccessibilityFocusProps = {
  isActive?: boolean
  platform?: 'ios' | 'android'
}

export const useAccessibilityAutoFocus = <T extends Component>({
  isActive = true,
  platform,
}: UseAccessibilityFocusProps = {}) => {
  const dispatch = useDispatch()
  const focusRef = useRef<T>(null)
  const focusOnElement = useFocusOnElement()
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
      !focusRef.current ||
      !isActive ||
      !isFocus ||
      !isLayoutUpdated ||
      !isScreenReaderEnabled
    ) {
      return
    }

    // Call focus as soon as all considition is met
    focusOnElement(focusRef.current)

    // Attempt to call it again just in case AccessibilityInfo.setAccessibilityFocus is delayed
    const timeoutId = setTimeout(
      () => focusOnElement(focusRef.current),
      Duration.normal,
    )

    return () => clearTimeout(timeoutId)
  }, [
    dispatch,
    focusOnElement,
    focusRef,
    isActive,
    isFocus,
    isLayoutUpdated,
    isScreenReaderEnabled,
    platform,
  ])

  return focusRef
}
