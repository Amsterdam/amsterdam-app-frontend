import {Screen} from '@/components/ui/layout'
import {EnvironmentSelector} from '@/modules/home/components'
import {isDevApp} from '@/processes/development'

export const AdminScreen = () => (
  <Screen keyboardAware>{!!isDevApp && <EnvironmentSelector />}</Screen>
)
