import {
  AlertVariant,
  type AlertProps,
} from '@/components/ui/feedback/alert/Alert.types'
import {useGetMaxLicensePlates} from '@/modules/parking/hooks/useGetMaxLicensePlates'

export const useMaxLicensePlatesAlert = (): AlertProps => {
  const maxLicensePlates = useGetMaxLicensePlates()

  return {
    variant: AlertVariant.warning,
    text: `Er kunnen niet meer dan ${maxLicensePlates} kentekens worden opgeslagen.`,
    title: 'Maximum aantal kentekens',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'ParkingMaxLicensePlatesAlert',
  }
}
