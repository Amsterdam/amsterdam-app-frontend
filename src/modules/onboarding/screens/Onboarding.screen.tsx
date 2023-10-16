import {Button} from '@/components/ui/buttons/Button'
import {Screen} from '@/components/ui/layout/Screen'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {Onboarding} from '@/modules/onboarding/components/Onboarding'
import {
  selectHasSeenOnboarding,
  setHasSeenOnboarding,
} from '@/modules/onboarding/slice'

export const OnboardingScreen = () => {
  const hasSeenOnboarding = useSelector(selectHasSeenOnboarding)
  const dispatch = useDispatch()

  return (
    <Screen
      scroll={false}
      withBottomInset={false}
      withLeftInset
      withRightInset
      withTopInset>
      <Button
        label="False"
        onPress={() => dispatch(setHasSeenOnboarding(false))}
      />

      {!hasSeenOnboarding && <Onboarding />}
    </Screen>
  )
}
