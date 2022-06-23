import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode, useCallback} from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {SwipeToDelete} from '../../../../src/components/ui/SwipeToDelete'
import {Theme, useThemable} from '../../../themes'
import {HomeRouteName} from '../routes'
import {toggleModule} from '../store'
import {RootStackParamList} from '@/app/navigation'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'

type Props = {
  icon: ReactNode
  label: string
  name?: keyof RootStackParamList
  slug?: string | undefined
}

export const ModuleButton = ({icon, label, name, slug}: Props) => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, HomeRouteName>>()
  const styles = useThemable(createStyles)
  const onDelete = useCallback(() => {
    dispatch(toggleModule(slug))
  }, [slug, dispatch])
  return (
    <View style={styles.container}>
      <SwipeToDelete onPress={onDelete} onSwipe={onDelete} label="Verwijderen">
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={name ? () => navigation.navigate(name) : undefined}
            inset="md">
            <Row gutter="md" valign="center">
              {icon}
              <Title level="h5" text={label} />
            </Row>
          </Pressable>
        </View>
      </SwipeToDelete>
    </View>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.box.background.invalid,
    },
    buttonContainer: {
      backgroundColor: 'white',
    },
  })
