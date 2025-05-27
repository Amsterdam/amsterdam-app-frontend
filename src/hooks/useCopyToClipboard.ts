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
    if (isCopied) {
      const timeout = setTimeout(
        () => setIsCopied(false),
        COPIED_STATE_DURATION,
      )

      return () => clearTimeout(timeout)
    }

    return () => null
  }, [isCopied])

  return {isCopied, copyToClipboard}
}
