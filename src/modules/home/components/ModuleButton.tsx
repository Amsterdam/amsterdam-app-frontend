import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode, useContext} from 'react'
import {StyleSheet, TouchableHighlight} from 'react-native'
import {RootStackParamList} from '../../../app/navigation'
import {Row} from '../../../components/ui/layout'
import {Title} from '../../../components/ui/typography'
import {Theme, ThemeContext, useThemable} from '../../../themes'

type Props = {
  icon: ReactNode
  label: string
  name?: keyof RootStackParamList
}

export const ModuleButton = ({icon, label, name}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()
  const {theme} = useContext(ThemeContext)
  const styles = useThemable(createStyles)

  return (
    <TouchableHighlight
      activeOpacity={1}
      onPress={name ? () => navigation.navigate(name) : undefined}
      style={styles.button}
      underlayColor={theme.color.box.background.grey}>
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
      paddingHorizontal: size.spacing.lg,
      paddingVertical: size.spacing.md,
    },
  })
