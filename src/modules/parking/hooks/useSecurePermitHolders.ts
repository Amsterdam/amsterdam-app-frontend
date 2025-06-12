import {useEffect, useState} from 'react'
import {SecureParkingAccount} from '@/modules/parking/types'
import {devLog} from '@/processes/development'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const useSecurePermitHolders = () => {
  const [permitHolders, setPermitHolders] = useState<SecureParkingAccount[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchPermitHolders = async () => {
      setIsLoading(true)

      try {
        const secureItem = await getSecureItem(
          SecureItemKey.parkingPermitHolder,
        )

        if (!secureItem) {
          if (isMounted) {
            setPermitHolders([])
          }

          setIsLoading(false)

          return
        }

        let parsed: unknown

        try {
          parsed = JSON.parse(secureItem)
        } catch {
          parsed = []
        }

        if (Array.isArray(parsed)) {
          if (isMounted) {
            setPermitHolders(
              (parsed as SecureParkingAccount[]).filter(
                item => typeof item === 'object' && item !== null,
              ),
            )
          }
        } else {
          if (isMounted) {
            setPermitHolders([])
          }
        }
      } catch (e) {
        devLog(e)

        if (isMounted) {
          setPermitHolders([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchPermitHolders()

    return () => {
      isMounted = false
    }
  }, [])

  return {permitHolders, isLoading}
}
