import {useContext, useEffect} from 'react'
import {DisableScrollContext} from '@/providers/disableScroll.provider'

export const useScreenScrollDisable = (hasError: boolean) => {
  const screenContext = useContext(DisableScrollContext)

  useEffect(() => {
    screenContext.setScrollDisabled(hasError)
  }, [hasError, screenContext])
}

export const useIsScreenScrollDisabled = () =>
  useContext(DisableScrollContext).scrollDisabled
