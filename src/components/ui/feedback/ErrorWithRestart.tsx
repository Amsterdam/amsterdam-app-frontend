import {StyleSheet, View} from 'react-native'
import RNRestart from 'react-native-restart'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Warning} from '@/components/ui/feedback/Warning'
import {Column} from '@/components/ui/layout/Column'
import {ScreenOutsideNavigation} from '@/components/ui/layout/Screen'
import {type Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {ScreenOutsideNavigationName} from '@/types/piwik'

export const ErrorWithRestart = () => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.screen}>
      <ScreenOutsideNavigation
        name={ScreenOutsideNavigationName.errorWithRestart}
        scroll={false}
        withTopInset>
        <Box inset="lg">
          <Column gutter="md">
            <Warning
              text="Er is iets misgegaan met de app."
              title="Sorry …"
            />
            <Button
              label="Herstart de app"
              onPress={() => RNRestart.Restart()}
            />
          </Column>
        </Box>
      </ScreenOutsideNavigation>
    </View>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    screen: {
      backgroundColor: color.screen.background.default,
      flex: 1,
    },
  })
