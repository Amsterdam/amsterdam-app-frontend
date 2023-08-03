import {Screen} from '@/components/ui/layout/Screen'
import {EnvironmentSelector} from '@/modules/home/components/EnvironmentSelector'
import {isDevApp} from '@/processes/development'

export const AdminScreen = () => (
  <Screen keyboardAware>{!!isDevApp && <EnvironmentSelector />}</Screen>
)
