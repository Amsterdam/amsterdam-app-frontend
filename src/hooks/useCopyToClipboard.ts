import {setStringAsync} from 'expo-clipboard'
import {useState, useEffect} from 'react'

const COPIED_STATE_DURATION = 4000

export const useCopyToClipboard = (text: string) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await setStringAsync(text)
    setIsCopied(true)
  }

  useEffect(() => {
    isCopied && setTimeout(() => setIsCopied(false), COPIED_STATE_DURATION)
  }, [isCopied])

  return {isCopied, copyToClipboard}
}
