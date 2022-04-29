import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {baseColor} from '../../../tokens'
import {Switch, SwitchProps} from '../../ui/forms'
import {Row} from '../../ui/layout'
import {Title} from '../../ui/typography'

type Props = {
  icon: ReactNode
  label: string
} & SwitchProps

export const ModuleSwitch = ({icon, label, onValueChange, value}: Props) => {
  const styles = useThemable(createStyles({value}))

  return (
    <View style={styles.container}>
      <Switch
        label={
          <Row gutter="md" valign="center">
            {icon}
            <Title level="h5" text={label} />
          </Row>
        }
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  )
}

const createStyles =
  ({value}: Partial<Props>) =>
  (theme: Theme) => {
    const borderWidth = 1

    return StyleSheet.create({
      container: {
        padding: theme.size.spacing.md - borderWidth,
        backgroundColor: value ? theme.color.background.white : undefined,
        borderColor: value ? 'transparent' : baseColor.neutral.grey5,
        borderWidth,
        borderStyle: 'dashed',
      },
    })
  }
