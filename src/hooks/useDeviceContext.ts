import {useContext} from 'react'
import {DeviceContext} from '@/providers/device.context'

export const useDeviceContext = () => useContext(DeviceContext)
