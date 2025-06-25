import {useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {ParkingLoginForm} from '@/modules/parking/components/login/ParkingLoginForm'
import {useLoginSteps} from '@/modules/parking/hooks/useLoginSteps'
import {useShouldShowLoginScreen} from '@/modules/parking/hooks/useShouldShowLoginScreen'
import {ParkingRouteName} from '@/modules/parking/routes'
import {parkingApi} from '@/modules/parking/service'
import {parkingSlice, useParkingAccounts} from '@/modules/parking/slice'

type Props = NavigationProps<ParkingRouteName.login>

export const ParkingLoginScreen = ({navigation: {reset}, route}: Props) => {
  const {params} = route ?? {}
  const dispatch = useDispatch()
  const {shouldShowLoginScreen, setShouldShowLoginScreen} =
    useShouldShowLoginScreen()
  const accounts = useParkingAccounts()
  const {accessCode} = useGetSecureAccessCode()
  const {isLoginStepsActive} = useLoginSteps()
  const isExistingAccount = Object.keys(accounts).some(
    key => key === params?.reportCode,
  )

  useEffect(() => {
    if (isExistingAccount && params) {
      dispatch(parkingSlice.actions.setCurrentAccount(params.reportCode))
      dispatch(
        parkingSlice.actions.setCurrentPermitReportCode(params.reportCode),
      )
      dispatch(parkingApi.util.resetApiState())
      setTimeout(() => {
        if (accessCode && !isLoginStepsActive) {
          // These should be the same conditions that the stack uses to include the dashboard screen
          reset({
            index: 0,
            routes: [
              {
                name: ParkingRouteName.dashboard,
              },
            ],
          })
        }
      }, 1000)
    }
  }, [
    accessCode,
    dispatch,
    isExistingAccount,
    isLoginStepsActive,
    params,
    reset,
  ])

  useBlurEffect(() => {
    shouldShowLoginScreen && setShouldShowLoginScreen(false)
  })

  return isExistingAccount ? null : (
    <Screen
      hasStickyAlert
      keyboardAware
      testID="ParkingLoginScreen">
      <Box>
        <ParkingLoginForm />
      </Box>
    </Screen>
  )
}
