import {BUILD_NUMBER, VERSION} from '@env'
import {useEffect, useState} from 'react'
import {AsyncStorageKey, useAsyncStorage} from '@/hooks/useAsyncStorage'

const CURRENT_FULL_VERSION =
  VERSION && BUILD_NUMBER ? `${VERSION}.${BUILD_NUMBER}` : ''

// TODO: remove when we no longer support app versions that do not store the version number
// at that point useStoreAppVersion can return undefined, which will result in the desired behaviour: if no version number found, then no rehydration
const DEFAULT_FULL_VERSION = '0.0.0.0'

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
      .then((v = DEFAULT_FULL_VERSION) => {
        setVersion(v)
      })
      .finally(() => {
        setLoading(false)
        if (CURRENT_FULL_VERSION) {
          void storeInAsyncStorage(CURRENT_FULL_VERSION)
        }
      })
  }, [getFromAsyncStorage, storeInAsyncStorage])

  return {hasUpdated: version !== CURRENT_FULL_VERSION, loading, version}
}
