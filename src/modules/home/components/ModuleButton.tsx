import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ElementType, SVGProps, useCallback} from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Pressable, SwipeToDelete} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {icons} from '@/modules/home/config'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {toggleModule} from '@/store'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

type ButtonVariants = 'primary' | 'tertiary'

type Props = {
  BadgeValue?: ElementType
  iconName: string
  label: string
  slug: ModuleSlug
  variant?: ButtonVariants
}

export const ModuleButton = ({
  BadgeValue,
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
  const styles = useThemable(createStyles)

  const onDelete = useCallback(() => {
    dispatch(toggleModule(slug))
  }, [slug, dispatch])

  return (
    <View style={styles.swipeToDeleteContainer}>
      <SwipeToDelete onEvent={onDelete}>
        <Pressable
          accessibilityLabel={accessibleText(label)}
          inset="md"
          onPress={() => navigation.navigate(slug)}
          variant={variant}>
          <Row align="between" valign="center">
            <Row gutter="md">
              {!!ModuleIcon && (
                <Icon size={24}>
                  <ModuleIcon {...iconProps} />
                </Icon>
              )}
              <Title
                color={variant === 'primary' ? 'inverse' : 'default'}
                level="h5"
                text={label}
              />
            </Row>
            {!!BadgeValue && <BadgeValue />}
          </Row>
        </Pressable>
      </SwipeToDelete>
    </View>
  )
}

const createIconProps =
  (variant: ButtonVariants) =>
  ({color}: Theme): SVGProps<unknown> => ({
    fill: variant === 'tertiary' ? color.text.default : color.text.inverse,
  })

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    swipeToDeleteContainer: {
      backgroundColor: color.box.background.invalid,
    },
  })
