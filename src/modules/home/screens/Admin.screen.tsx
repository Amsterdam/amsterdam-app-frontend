import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {EnvironmentSelector} from '@/modules/home/components/EnvironmentSelector'
import {BottomSheetSurvey} from '@/modules/survey/exports/BottomSheetSurvey'
import {useOpenBottomsheetIfSurveyShouldShow} from '@/modules/survey/exports/useOpenBottomsheetIfSurveyShouldShow'
import {isDevApp} from '@/processes/development'
import {VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

export const AdminScreen = () => {
  const openSurveyBottomsheet = useOpenBottomsheetIfSurveyShouldShow('admin')

  return (
    <Screen
      bottomSheet={<BottomSheetSurvey testID="AdminScreenBottomSheet" />}
      hasStickyAlert
      headerOptions={{disableHorizontalInsets: true}}
      keyboardAware
      testID="HomeTestAdminScreen">
      {!!isDevApp && (
        <>
          <Column
            grow={1}
            gutter="xl">
            <EnvironmentSelector />
            <Box>
              <Phrase
                testID="HomeTestAdminBuildNumberPhrase"
                textAlign="center">
                {VERSION_NUMBER_WITH_BUILD}
              </Phrase>
            </Box>
          </Column>
          <Box>
            <Button
              label="Toon actieformulier"
              onPress={() => openSurveyBottomsheet()}
              testID="AdminScreenShowSurveyButton"
            />
          </Box>
        </>
      )}
    </Screen>
  )
}
