import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode} from 'react'
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {useSelector, useDispatch} from 'react-redux'
import {RootStackParamList} from '../../../app/navigation'
import {Row} from '../../../components/ui/layout'
import {Title} from '../../../components/ui/typography'
import {selectTheme} from '../../../themes'
import {font, size, color} from '../../../tokens'
import {toggleModule} from '../store'

type Props = {
  icon: ReactNode
  label: string
  name?: keyof RootStackParamList
  slug?: string | undefined
}

export const ModuleButton = ({icon, label, name, slug}: Props) => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()
  const {theme} = useSelector(selectTheme)
  const onChange = (key: string) => {
    dispatch(toggleModule(key))
  }

  const DeleteButton = () => {
    return (
      <View style={styles.rightActionContainer}>
        <View style={styles.rightAction}>
          <Text style={styles.actionText}>Verwijderen</Text>
          <TrashBin style={styles.actionIcon} />
        </View>
      </View>
    )
  }
  return (
    <Swipeable
      renderRightActions={DeleteButton}
      onSwipeableRightOpen={() => onChange(slug)}>
      <TouchableHighlight
        activeOpacity={1}
        onPress={name ? () => navigation.navigate(name) : undefined}
        style={styles.button}
        underlayColor={theme.color.pressable.pressed.background}>
        <Row gutter="md" valign="center">
          {icon}
          <Title level="h5" text={`${label}`} />
        </Row>
      </TouchableHighlight>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: size.spacing.md,
    backgroundColor: 'white',
  },
  rightActionContainer: {
    backgroundColor: color.touchable.secondary,
  },
  rightAction: {
    color: color.background.white,
    padding: size.spacing.md,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontFamily: font.weight.bold,
    marginRight: 16,
  },
  actionIcon: {
    width: 25,
    height: 25,
    fill: color.background.white,
  },
})
