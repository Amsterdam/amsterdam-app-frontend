import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {
  PressableBase,
  PressableBaseProps,
} from '@/components/ui/buttons/PressableBase'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Phrase} from '@/components/ui/text/Phrase'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  iconName: SvgIconName
  label: string | ReactNode
} & PressableBaseProps

export const ActionButton = ({
  accessibilityLabel,
  iconName,
  label,
  ...props
}: Props) => {
  const {testID} = props
  const styles = useThemable(createStyles)

  return (
    <View
      accessibilityLabel={
        accessibilityLabel ??
        `Actieknop. ${typeof label === 'string' ? label : ''}`
      }
      accessibilityRole="link"
      accessible>
      <Column
        gutter="sm"
        halign="center">
        <PressableBase
          style={styles.button}
          {...props}>
          <Icon
            color="inverse"
            name={iconName}
            size="xl"
            testID={`${testID}Icon`}
          />
        </PressableBase>
        <Phrase
          color="link"
          emphasis="strong"
          testID={`${testID}Phrase`}
          variant="small">
          {label}
        </Phrase>
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
