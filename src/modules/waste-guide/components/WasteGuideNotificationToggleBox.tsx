import {useCallback} from 'react'
import {NotificationToggleBox} from '@/components/features/NotificationToggleBox'
import {Box} from '@/components/ui/containers/Box'
import {useMyAddress} from '@/modules/address/slice'
import {
  useDeleteWasteGuideNotificationMutation,
  useGetWasteGuideNotificationQuery,
  usePostWasteGuideNotificationMutation,
} from '@/modules/waste-guide/service'

export const WasteGuideNotificationToggleBox = () => {
  const address = useMyAddress()
  const {isLoading, isSuccess, data} = useGetWasteGuideNotificationQuery()

  const [postWasteGuideNotification] = usePostWasteGuideNotificationMutation()
  const [deleteWasteGuideNotification] =
    useDeleteWasteGuideNotificationMutation()

  const onChange = useCallback(
    (value: boolean) => {
      if (value && address?.bagId) {
        void postWasteGuideNotification(address?.bagId)
      } else {
        void deleteWasteGuideNotification()
      }
    },
    [address?.bagId, deleteWasteGuideNotification, postWasteGuideNotification],
  )

  if (!address) {
    return null
  }

  return (
    <Box>
      <NotificationToggleBox
        description="U ontvangt meldingen over ophaaldagen voor ‘Mijn adres’."
        disabled={isLoading}
        onChange={onChange}
        testID="WasteGuideNotificationSwitch"
        value={!!isSuccess && data.status === 'success'}
      />
    </Box>
  )
}
