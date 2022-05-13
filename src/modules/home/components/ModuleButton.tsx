import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode} from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {RootStackParamList} from '../../../app/navigation'
import {Row} from '../../../components/ui/layout'
import {Title} from '../../../components/ui/typography'
import {Theme, useThemable} from '../../../themes'

type Props = {
  icon: ReactNode
  label: string
  name?: keyof RootStackParamList
}

export const ModuleButton = ({icon, label, name}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()
  const styles = useThemable(createStyles)

  return (
    <Pressable
      onPress={name ? () => navigation.navigate(name) : undefined}
      style={styles.button}>
      <Row gutter="md" valign="center">
        {icon}
        <Title level="h4" text={label} />
      </Row>
    </Pressable>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      paddingHorizontal: theme.size.spacing.lg,
      paddingVertical: theme.size.spacing.md,
    },
  })
