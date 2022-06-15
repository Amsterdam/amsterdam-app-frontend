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
import {Theme, useThemable} from '../../../themes'
import {toggleModule} from '../store'

type Props = {
  icon: ReactNode
  label: string
  name?: keyof RootStackParamList
  slug?: string | undefined
}

type DeleteProps = {
  onPress: () => void
}

export const DeleteButton = ({onPress}: DeleteProps) => {
  const styles = useThemable(createStyles)
  return (
    <View>
      <Pressable style={styles.rightAction} onPress={() => onPress()}>
        <Text style={styles.actionText}>Verwijderen</Text>
        <TrashBin style={styles.actionIcon} />
      </Pressable>
    </View>
  )
}

export const ModuleButton = ({icon, label, name, slug}: Props) => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()
  const styles = useThemable(createStyles)
  const onDelete = () => {
    dispatch(toggleModule(slug))
  }
  return (
    <View style={styles.container}>
      <Swipeable
        renderRightActions={() => <DeleteButton onPress={onDelete} />}
        onSwipeableRightOpen={() => {
          setSwipeOpen(true)
          swipeOpen && onDelete()
        }}>
        <View style={styles.buttonContainer}>
          <BlockLink
            onPress={name ? () => navigation.navigate(name) : undefined}
            padding="md">
            <Row gutter="md" valign="center">
              {icon}
              <Title level="h5" text={label} />
            </Row>
          </BlockLink>
        </View>
      </Swipeable>
    </View>
  )
}

const createStyles = ({color, size, text}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.box.background.invalid,
    },
    buttonContainer: {
      backgroundColor: 'white',
    },
    rightAction: {
      color: color.box.background.white,
      padding: size.spacing.md,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    actionText: {
      color: 'white',
      fontFamily: text.fontWeight.bold,
      marginRight: 16,
    },
    actionIcon: {
      width: 25,
      height: 25,
      fill: color.box.background.white,
    },
  })
