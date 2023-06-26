import {BUILD_NUMBER, VERSION} from '@env'
import {useEffect, useState} from 'react'
import {AsyncStorageKey, useAsyncStorage} from '@/hooks/useAsyncStorage'

const CURRENT_FULL_VERSION =
  VERSION && BUILD_NUMBER ? `${VERSION}.${BUILD_NUMBER}` : ''

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
        if (CURRENT_FULL_VERSION) {
          void storeInAsyncStorage(CURRENT_FULL_VERSION)
        }
      })
  }, [getFromAsyncStorage, storeInAsyncStorage])

  return {hasUpdated: version !== CURRENT_FULL_VERSION, loading, version}
}
