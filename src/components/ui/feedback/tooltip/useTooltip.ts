import {useCallback, useState} from 'react'

export const useTooltip = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleTooltip = useCallback(() => {
    setIsOpen(open => !open)
  }, [])

  return {isOpen, toggleTooltip}
}
