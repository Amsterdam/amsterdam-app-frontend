import React from 'react'
import {StyleSheet} from 'react-native'
import {Center} from './layout'
import {Spinner} from './'

type Props = {
  fullSize?: boolean
}

export const PleaseWait = ({fullSize = true}: Props) => {
  const styles = createStyles({fullSize})

  return (
    <Center style={styles.fullSize}>
      <Spinner />
    </Center>
  )
}

const createStyles = ({fullSize}: Props) =>
  StyleSheet.create({
    fullSize: {
      width: fullSize ? '100%' : undefined,
      height: fullSize ? '100%' : undefined,
    },
  })
