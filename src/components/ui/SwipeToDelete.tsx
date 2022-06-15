import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import React, {ReactNode, useState} from 'react'
import {StyleSheet, View, Pressable, Text} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {Theme, useThemable} from '../../themes'

type Props = {
  onPress: () => void
  onSwipe: () => void
  label: String
  children: ReactNode
}

export const SwipeToDelete = ({onPress, onSwipe, label, children}: Props) => {
  const [swipeOpen, setSwipeOpen] = useState(false)
  const styles = useThemable(createStyles)

  return (
    <Swipeable
      renderRightActions={() => (
        <View>
          <Pressable style={styles.rightAction} onPress={() => onPress()}>
            <Text style={styles.actionText}>{label}</Text>
            <TrashBin style={styles.actionIcon} />
          </Pressable>
        </View>
      )}
      onSwipeableRightOpen={() => {
        setSwipeOpen(true)
        swipeOpen && onSwipe()
      }}>
      {children}
    </Swipeable>
  )
}

const createStyles = ({color, size, text}: Theme) =>
  StyleSheet.create({
    rightAction: {
      color: color.box.background.white,
      backgroundColor: color.box.background.invalid,
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
