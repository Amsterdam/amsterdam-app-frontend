import {useContext} from 'react'
import {DeviceContext} from '@/providers/device.provider'

export const useDeviceContext = () => useContext(DeviceContext)
