// eslint-disable-next-line no-restricted-imports
import {Pressable, PressableProps, StyleSheet, View} from 'react-native'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Phrase} from '@/components/ui/text/Phrase'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  iconName: SvgIconName
  label: string
} & PressableProps

export const ActionButton = ({iconName, label, ...props}: Props) => {
  const {testID} = props
  const styles = useThemable(createStyles)

  return (
    <View
      accessibilityLabel={`Actieknop. ${label} tonen`}
      accessibilityRole="link"
      accessible>
      <Column
        gutter="sm"
        halign="center">
        <Pressable
          style={styles.button}
          {...props}>
          <Icon
            color="inverse"
            name={iconName}
            size="xl"
            testID={`${testID}Icon`}
          />
        </Pressable>
        <Phrase
          color="link"
          emphasis="strong"
          testID={`${testID}Phrase`}
          variant="small">{`${label} tonen`}</Phrase>
      </Column>
    </View>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.pressable.primary.default.background,
      height: 60,
      width: 60,
      borderRadius: '50%',
    },
  })
