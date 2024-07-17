import {useState, useCallback, useEffect} from 'react'
import ReactNativeBiometrics from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics()

export const useBiometrics = ({
  autoTrigger = true,
  cancelButtonText,
  fallbackPromptMessage,
  promptMessage,
}: {
  autoTrigger?: boolean
  cancelButtonText?: string
  fallbackPromptMessage?: string
  promptMessage: string
}) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [failed, setFailed] = useState(false)
  const authenticate = useCallback(async () => {
    const {available} = await rnBiometrics.isSensorAvailable()

    if (available) {
      rnBiometrics
        .simplePrompt({
          cancelButtonText,
          fallbackPromptMessage,
          promptMessage,
        })
        .then(
          () => {
            setAuthenticated(true)
            setFailed(false)
          },
          () => {
            setFailed(true)
          },
        )
    } else {
      setFailed(false)
      setAuthenticated(true)
    }
  }, [cancelButtonText, fallbackPromptMessage, promptMessage])

  useEffect(() => {
    if (autoTrigger) {
      void authenticate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoTrigger])

  return {authenticated, authenticate, failed}
}
