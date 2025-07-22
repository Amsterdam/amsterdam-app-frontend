import {useContext, useEffect} from 'react'
import {ScreenContext} from '@/providers/screen.context'

export const useScreenScrollDisable = (hasError: boolean) => {
  const screenContext = useContext(ScreenContext)

  useEffect(() => {
    screenContext.setScrollDisabled(hasError)
  }, [hasError, screenContext])
}

export const useIsScreenScrollDisabled = () =>
  useContext(ScreenContext).scrollDisabled
