// eslint-disable-next-line no-restricted-imports
import dayjsFn, {ConfigType} from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/nl'

export {Dayjs} from 'dayjs'

const defaultTimezone = 'Europe/Amsterdam'

dayjsFn.locale('nl')
dayjsFn.extend(utc)
dayjsFn.extend(timezone)
dayjsFn.tz.setDefault(defaultTimezone)

/**
 * This function replaces the default dayjs function to make sure the timezone uses the default that is set above and the locale is set properly
 */
export const dayjs = (date?: ConfigType) =>
  dayjsFn(date).tz(defaultTimezone, true)
