import {useState, useEffect} from 'react'
import {check, Permission} from 'react-native-permissions'

export const useIsPermissionFeatureAvailableOnDevice = (
  permission: Permission,
) => {
  const [isAvailable, setIsAvailable] = useState<boolean>()

  useEffect(() => {
    void check(permission).then(result => {
      setIsAvailable(result !== 'unavailable')
    })
  }, [permission])

  return isAvailable
}
