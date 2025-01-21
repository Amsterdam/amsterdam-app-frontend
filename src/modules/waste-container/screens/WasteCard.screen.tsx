import {Title} from '@/components/ui/text/Title'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {SecureItemKey} from '@/utils/secureStorage'

export const WasteCardScreen = () => {
  const {item: secureWasteCardNumber} = useGetSecureItem(
    SecureItemKey.wasteCardNumber,
  )

  return secureWasteCardNumber ? <Title text={secureWasteCardNumber} /> : null
}
