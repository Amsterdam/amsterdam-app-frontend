import {useCallback} from 'react'
import {NotificationToggleBox} from '@/components/features/NotificationToggleBox'
import {Box} from '@/components/ui/containers/Box'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectAddress} from '@/modules/address/slice'
import {
  useGetBurningGuideNotificationQuery,
  usePostBurningGuideNotificationMutation,
  useDeleteBurningGuideNotificationMutation,
} from '@/modules/burning-guide/service'

export const BurningGuideNotificationToggleBox = () => {
  const address = useSelector(selectAddress)
  const {isLoading, isSuccess, data} = useGetBurningGuideNotificationQuery()

  const [postBurningGuideNotification] =
    usePostBurningGuideNotificationMutation()
  const [deleteBurningGuideNotification] =
    useDeleteBurningGuideNotificationMutation()
  const onChange = useCallback(
    (value: boolean) => {
      if (value && address?.bagId) {
        void postBurningGuideNotification(address?.bagId)
      } else {
        void deleteBurningGuideNotification()
      }
    },
    [
      address?.bagId,
      deleteBurningGuideNotification,
      postBurningGuideNotification,
    ],
  )

  if (!address) {
    return null
  }

  return (
    <Box>
      <NotificationToggleBox
        description="U ontvangt meldingen als het Code rood is voor ‘Mijn adres’."
        disabled={isLoading}
        onChange={onChange}
        testID="BurningGuideNotificationSwitch"
        value={!!isSuccess && data.status === 'success'}
      />
    </Box>
  )
}
