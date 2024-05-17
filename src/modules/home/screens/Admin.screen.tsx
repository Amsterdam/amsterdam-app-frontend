import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {EnvironmentSelector} from '@/modules/home/components/EnvironmentSelector'
import {ResetIosImageCache} from '@/modules/home/components/ResetIosImageCache'
import {isDevApp} from '@/processes/development'
import {VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

export const AdminScreen = () => (
  <Screen
    keyboardAware
    testID="HomeTestAdminScreen">
    {!!isDevApp && (
      <Column gutter="xl">
        <EnvironmentSelector />
        <ResetIosImageCache />
        <Box>
          <Phrase
            testID="HomeTestAdminBuildNumberPhrase"
            textAlign="center">
            {VERSION_NUMBER_WITH_BUILD}
          </Phrase>
        </Box>
      </Column>
    )}
  </Screen>
)
