import {useCallback, useState} from 'react'

export const useTooltip = (defaultIsOpen: boolean | undefined = false) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const toggleTooltip = useCallback(() => {
    setIsOpen(open => open)
  }, [])

  return {isOpen, toggleTooltip}
}
