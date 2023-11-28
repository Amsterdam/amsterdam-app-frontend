import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Screen} from '@/components/ui/layout/Screen'
import {Phrase} from '@/components/ui/text/Phrase'
import {EnvironmentSelector} from '@/modules/home/components/EnvironmentSelector'
import {ResetIosImageCache} from '@/modules/home/components/ResetIosImageCache'
import {isDevApp} from '@/processes/development'
import {FULL_VERSION_NUMBER} from '@/utils/version'

export const AdminScreen = () => (
  <Screen keyboardAware>
    {!!isDevApp && (
      <Box>
        <Column gutter="lg">
          <EnvironmentSelector />
          <ResetIosImageCache />
          <Phrase>{FULL_VERSION_NUMBER}</Phrase>
        </Column>
      </Box>
    )}
  </Screen>
)
