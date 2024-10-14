// eslint-disable-next-line no-restricted-imports
import dayjsFn, {ConfigType} from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/nl'

export {Dayjs} from 'dayjs'

const defaultTimezone = 'Europe/Amsterdam'

dayjsFn.extend(utc)
dayjsFn.extend(timezone)

dayjsFn.locale('nl')
dayjsFn.tz.setDefault(defaultTimezone)

/**
 * This function replaces the default dayjs function to make sure the timezone uses the default that is set above and the locale is set properly
 */
export const dayjs = (date?: ConfigType) => {
  const date1 = dayjsFn(date).format()

  return dayjsFn(date1)
}

export const dayjsFromUnix = (timestamp: number) => {
  const date1 = dayjsFn.unix(timestamp)

  return dayjsFn(date1)
}
