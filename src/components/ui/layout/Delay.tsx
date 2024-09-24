import React, {useState, useEffect} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'

type Props = {
  children: React.ReactNode
  waitBeforeShow?: number
}

export const Delay = ({children, waitBeforeShow = 500}: Props) => {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true)
    }, waitBeforeShow)

    return () => clearTimeout(timer)
  }, [waitBeforeShow])

  return isShown ? children : <PleaseWait testID="DelayPleaseWait" />
}
