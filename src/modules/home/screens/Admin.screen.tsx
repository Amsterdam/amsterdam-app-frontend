import {Screen} from '@/components/ui/layout/Screen'
import {EnvironmentSelector} from '@/modules/home/components/EnvironmentSelector'
import {ResetIosImageCache} from '@/modules/home/components/ResetIosImageCache'
import {isDevApp} from '@/processes/development'

export const AdminScreen = () => (
  <Screen keyboardAware>
    {!!isDevApp && (
      <>
        <EnvironmentSelector />
        <ResetIosImageCache />
      </>
    )}
  </Screen>
)
