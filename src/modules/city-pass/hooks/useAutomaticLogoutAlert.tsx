import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectAutomaticLogoutAlertDismissed} from '@/modules/city-pass/slice'
import {useAlert} from '@/store/slices/alert'
import {dayjs} from '@/utils/datetime/dayjs'

const LOGOUT_DATE = dayjs('2025-07-31T00:00:00Z')
const SHOW_ALERT_DAYS_BEFORE = 21

const shouldShowAlert = () => {
  const now = dayjs()
  const diff = LOGOUT_DATE.diff(now, 'day')

  return diff <= SHOW_ALERT_DAYS_BEFORE && diff > 0
}

// TODO: remove after 2025-07-31
export const useAutomaticLogoutAlert = () => {
  const dispatch = useDispatch()
  const dismissed = useSelector(selectAutomaticLogoutAlertDismissed)
  const {setAlert} = useAlert()

  useEffect(() => {
    if (!dismissed && shouldShowAlert()) {
      setAlert({
        title: 'Automatisch uitgelogd',
        text: 'Op 31 juli loggen we je automatisch uit. Dit is nodig om je gegevens veilig te houden.',
        hasCloseIcon: true,
        testID: 'CityPassAutomaticLogoutAlert', // When this changes, also update the testID in AlertTopOfScreen.tsx
      })
    }
  }, [dispatch, dismissed, setAlert])
}
