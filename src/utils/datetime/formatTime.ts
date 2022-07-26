import dayjs from 'dayjs'
import 'dayjs/locale/nl'
dayjs.locale('nl')

export const formatTime = (
  date: string | number,
  displaySeconds = false,
): string => {
  const dayJsDate = dayjs(date)

  if (displaySeconds) {
    return dayJsDate.format('HH:mm:ss')
  }
  return dayJsDate.format('HH:mm')
}
