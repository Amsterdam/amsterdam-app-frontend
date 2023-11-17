import {useState} from 'react'

export const useTooltip = (defaultIsOpen: boolean | undefined = false) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const toggleTooltip = () => {
    setIsOpen(!isOpen)
  }

  return {isOpen, toggleTooltip}
}
