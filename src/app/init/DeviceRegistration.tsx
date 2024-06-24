import type {Module} from '@/modules/types'
import {useDeviceRegistration} from '@/hooks/useDeviceRegistration'

type Props = {enabledModules?: Module[]}

export const DeviceRegistration = ({enabledModules}: Props) => {
  useDeviceRegistration(enabledModules)

  return null
}
