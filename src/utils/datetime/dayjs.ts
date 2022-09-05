/* eslint-disable no-restricted-imports */
import dayjsFn, {ConfigType} from 'dayjs'
export {Dayjs} from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/nl'

dayjsFn.locale('nl')
dayjsFn.extend(utc)
dayjsFn.extend(timezone)
dayjsFn.tz.setDefault('Europe/Amsterdam')

/**
 * This function replaces the default dayjs function to make sure the timezone uses the default that is set above and the locale is set properly
 */
export const dayjs = (date?: ConfigType, format?: string) =>
  dayjsFn.tz(date, format)
