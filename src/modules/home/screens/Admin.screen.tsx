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
      <Column gutter="xl">
        <EnvironmentSelector />
        <ResetIosImageCache />
        <Box>
          <Phrase textAlign="center">{FULL_VERSION_NUMBER}</Phrase>
        </Box>
      </Column>
    )}
  </Screen>
)
