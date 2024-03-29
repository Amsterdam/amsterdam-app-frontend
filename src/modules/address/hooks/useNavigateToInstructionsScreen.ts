import {useCallback} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressModalName} from '@/modules/address/routes'

export const useNavigateToInstructionsScreen = () => {
  const {navigate} = useNavigation<AddressModalName>()

  return useCallback(
    () => navigate(AddressModalName.locationPermissionInstructions),
    [navigate],
  )
}
