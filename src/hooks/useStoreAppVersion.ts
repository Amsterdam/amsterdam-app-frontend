import {BUILD_NUMBER, VERSION} from '@env'
import {useEffect, useState} from 'react'
import {AsyncStorageKey, useAsyncStorage} from '@/hooks/useAsyncStorage'

export const useStoreAppVersion = () => {
  const [version, setVersion] = useState<string | undefined>()
  const {getFromAsyncStorage, storeInAsyncStorage} = useAsyncStorage<
    string | undefined
  >(AsyncStorageKey.versionNumber)

  useEffect(() => {
    void getFromAsyncStorage().then(setVersion)
    if (!!VERSION && !!BUILD_NUMBER) {
      void storeInAsyncStorage(`${VERSION}.${BUILD_NUMBER}`)
    }
  }, [getFromAsyncStorage, storeInAsyncStorage])

  return version
}
