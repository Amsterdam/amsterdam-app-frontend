import {BUILD_NUMBER, VERSION} from '@env'
import {useEffect, useState} from 'react'
import {AsyncStorageKey, useAsyncStorage} from '@/hooks/useAsyncStorage'

/**
 * Get the app version, including build number (#.#.#.#) from the async storage. Sets the current app version if necessary.
 */
export const useStoreAppVersion = () => {
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState<string>()
  const {getFromAsyncStorage, storeInAsyncStorage} = useAsyncStorage<
    string | undefined
  >(AsyncStorageKey.versionNumber)

  useEffect(() => {
    void getFromAsyncStorage()
      .then(setVersion)
      .finally(() => {
        setLoading(false)
        if (!!VERSION && !!BUILD_NUMBER) {
          void storeInAsyncStorage(`${VERSION}.${BUILD_NUMBER}`)
        }
      })
  }, [getFromAsyncStorage, storeInAsyncStorage])

  return {loading, version}
}
