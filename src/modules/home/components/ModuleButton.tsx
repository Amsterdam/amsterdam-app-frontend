import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode} from 'react'
import {StyleSheet, TouchableHighlight} from 'react-native'
import {useSelector} from 'react-redux'
import {RootStackParamList} from '../../../app/navigation'
import {Row} from '../../../components/ui/layout'
import {Title} from '../../../components/ui/typography'
import {Theme, useThemable} from '../../../themes'
import {selectTheme} from '../../../themes/themeSlice'

type Props = {
  icon: ReactNode
  label: string
  name?: keyof RootStackParamList
}

export const ModuleButton = ({icon, label, name}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()
  const {theme} = useSelector(selectTheme)
  const styles = useThemable(createStyles)

  return (
    <TouchableHighlight
      activeOpacity={1}
      onPress={name ? () => navigation.navigate(name) : undefined}
      style={styles.button}
      underlayColor={theme.color.pressable.pressed.background}>
      <Row gutter="md" valign="center">
        {icon}
        <Title level="h5" text={label} />
      </Row>
    </TouchableHighlight>
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    button: {
      padding: size.spacing.md,
    },
  })
