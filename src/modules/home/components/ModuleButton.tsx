import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback} from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {SwipeToDelete} from '@/components/ui'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {icons} from '@/modules/home/config'
import {HomeRouteName} from '@/modules/home/routes'
import {toggleModule} from '@/modules/home/store'
import {ModuleSlugs} from '@/modules/slugs'
import {Theme, useThemable} from '@/themes'

type ButtonVariants = 'primary' | 'tertiary'

type Props = {
  iconName: string
  label: string
  slug: ModuleSlugs
  variant?: ButtonVariants
}

export const ModuleButton = ({
  iconName,
  label,
  slug,
  variant = 'tertiary',
}: Props) => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, HomeRouteName>>()

  const ModuleIcon = icons[iconName]
  const iconProps = useThemable(createIconProps(variant))
  const styles = useThemable(createStyles(variant))

  const onDelete = useCallback(() => {
    dispatch(toggleModule(slug))
  }, [slug, dispatch])

  return (
    <View style={styles.container}>
      <SwipeToDelete onEvent={onDelete}>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => navigation.navigate(slug)} inset="md">
            <Row gutter="md" valign="center">
              <Icon size={24}>
                <ModuleIcon {...iconProps} />
              </Icon>
              <Title
                color={variant === 'primary' ? 'inverse' : 'default'}
                level="h5"
                text={label}
              />
            </Row>
          </Pressable>
        </View>
      </SwipeToDelete>
    </View>
  )
}

const createIconProps =
  (variant: ButtonVariants) =>
  ({color}: Theme) => ({
    fill: variant === 'tertiary' ? color.text.default : color.text.inverse,
  })

const createStyles =
  (variant: ButtonVariants) =>
  ({color}: Theme) =>
    StyleSheet.create({
      container: {
        backgroundColor: color.box.background.invalid,
      },
      buttonContainer: {
        backgroundColor: color.pressable[variant].default,
      },
    })
