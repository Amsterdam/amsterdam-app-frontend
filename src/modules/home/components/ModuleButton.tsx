import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ElementType, useCallback} from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Pressable, SwipeToDelete} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon, IconName} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {toggleModule} from '@/store'
import {Theme, useThemable} from '@/themes'

type ButtonVariants = 'primary' | 'tertiary'

type Props = {
  BadgeValue?: ElementType
  iconName: IconName | 'projects'
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

  const styles = useThemable(createStyles)
  const iconColor = variant === 'primary' ? 'inverse' : 'default'

  const onDelete = useCallback(() => {
    dispatch(toggleModule(slug))
  }, [slug, dispatch])

  return (
    <View style={styles.swipeToDeleteContainer}>
      <SwipeToDelete onEvent={onDelete}>
        <Pressable
          inset="md"
          onPress={() => navigation.navigate(slug)}
          variant={variant}>
          <Row align="between" valign="center">
            <Row gutter="md">
              {/* TODO Remove fallback after updating icon name in database. */}
              {iconName === 'projects' ? (
                <Icon color={iconColor} name="construction-work" size={24} />
              ) : (
                !!iconName && (
                  <Icon color={iconColor} name={iconName} size={24} />
                )
              )}
              <Title color={iconColor} level="h5" text={label} />
            </Row>
            {!!BadgeValue && <BadgeValue />}
          </Row>
        </Pressable>
      </SwipeToDelete>
    </View>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    swipeToDeleteContainer: {
      backgroundColor: color.box.background.invalid,
    },
  })
