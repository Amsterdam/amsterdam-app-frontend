import {EventType} from '@notifee/react-native'
import type {ModuleClientConfig} from '@/modules/types'
import {parkingApi} from '@/modules/parking/service'
import {
  setCurrentAccountByPermitReportCode,
  setCurrentPermitReportCode,
} from '@/modules/parking/slice'

export const onNotificationEvent: ModuleClientConfig<{
  reportCode?: string
}>['onNotificationEvent'] = (type, {notification}, _, dispatch) => {
  const reportCode = notification?.data?.reportCode
  const module_slug = notification?.data?.module_slug

  if (type === EventType.PRESS) {
    dispatch(setCurrentPermitReportCode(reportCode))
    dispatch(setCurrentAccountByPermitReportCode(reportCode))
    dispatch(parkingApi.util.resetApiState())

    return `/module/${module_slug}`
  }
}
