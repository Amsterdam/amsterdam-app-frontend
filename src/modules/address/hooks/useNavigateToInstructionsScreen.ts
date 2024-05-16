import {useCallback} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {HomeModalName} from '@/modules/home/routes'
import {PermissionInstructionScreenParams} from '@/modules/home/types'
import {Permissions} from '@/types/permissions'

const navigationParams: Record<
  Permissions[number],
  PermissionInstructionScreenParams
> = {
  [Permissions.location]: {
    icon: 'location',
    paragraph: 'Ga naar Instellingen en geef de app toegang tot uw locatie.',
    permission: Permissions.location,
    screenTitle: 'Locatie delen',
    title: 'Geef uw locatie door',
  },
  [Permissions.notifications]: {
    icon: 'alarm',
    paragraph:
      'Ga naar Instellingen en zet de Meldingen aan zodat u geen belangrijke informatie mist.',
    permission: Permissions.notifications,
    screenTitle: 'Notificatie',
    title: 'U ontvangt geen notificaties',
  },
}

export const useNavigateToInstructionsScreen = (permission: Permissions) => {
  const {navigate} = useNavigation<HomeModalName>()

  return useCallback(
    () =>
      navigate(
        HomeModalName.permissionInstructions,
        navigationParams[permission],
      ),
    [navigate, permission],
  )
}
