import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode, useCallback} from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {SwipeToDelete} from '@/components/ui'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {HomeRouteName} from '@/modules/home/routes'
import {toggleModule} from '@/modules/home/store'
import {ModuleSlugs} from '@/modules/slugs'
import {Theme, useThemable} from '@/themes'

type Props = {
  icon: ReactNode
  label: string
  slug: ModuleSlugs
}

export const ModuleButton = ({icon, label, slug}: Props) => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, HomeRouteName>>()
  const styles = useThemable(createStyles)

  const onDelete = useCallback(() => {
    dispatch(toggleModule(slug))
  }, [slug, dispatch])

  return (
    <View style={styles.container}>
      <SwipeToDelete onEvent={onDelete}>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => navigation.navigate(slug)} inset="md">
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
      backgroundColor: color.box.background.white,
    },
  })
