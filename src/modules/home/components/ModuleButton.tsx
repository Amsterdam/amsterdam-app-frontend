import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {ElementType, useCallback, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {SwipeToDelete} from '@/components/ui/buttons/SwipeToDelete'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {IconName} from '@/components/ui/media/iconPaths'
import {Title} from '@/components/ui/text/Title'
import {TestProps} from '@/components/ui/types'
import {InactiveModuleMessage} from '@/modules/home/components/InactiveModuleMessage'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {toggleModule} from '@/store/slices/modules'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type ModuleButtonContentProps = {
  BadgeValue?: ElementType
  disabled: boolean | undefined
  iconName: IconName | 'projects'
  label: string
  variant: ButtonVariants
}

const ModuleButtonContent = ({
  BadgeValue,
  disabled,
  iconName,
  label,
  variant,
}: ModuleButtonContentProps) => {
  const color = useMemo(() => {
    if (disabled) {
      return 'secondary'
    }

    if (variant === 'primary') {
      return 'inverse'
    }

    return 'default'
  }, [disabled, variant])

  return (
    <Column gutter="sm">
      <Row
        align="between"
        valign="center">
        <Row gutter="md">
          {/* TODO Remove fallback after updating icon name in database. */}
          {iconName === 'projects' ? (
            <Icon
              color={color}
              name="construction-work"
              size="lg"
            />
          ) : (
            !!iconName && (
              <Icon
                color={color}
                name={iconName}
                size="lg"
              />
            )
          )}
          <Title
            color={color}
            level="h5"
            text={label}
          />
        </Row>
        {!!BadgeValue && !disabled && <BadgeValue />}
      </Row>
      {!!disabled && <InactiveModuleMessage />}
    </Column>
  )
}

type ButtonVariants = 'primary' | 'tertiary'

type ModuleButtonProps = {
  BadgeValue?: ElementType
  disabled?: boolean
  iconName: IconName | 'projects'
  label: string
  slug: ModuleSlug
  variant?: ButtonVariants
} & TestProps

export const ModuleButton = ({
  BadgeValue,
  disabled,
  iconName,
  label,
  slug,
  testID,
  variant = 'tertiary',
}: ModuleButtonProps) => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, HomeRouteName>>()

  const styles = useThemable(createStyles)

  const onDelete = useCallback(() => {
    dispatch(toggleModule(slug))
  }, [slug, dispatch])

  const ModuleButtonContentComponent = (
    <ModuleButtonContent
      BadgeValue={BadgeValue}
      disabled={disabled}
      iconName={iconName}
      label={label}
      variant={variant}
    />
  )

  return disabled ? (
    <Box
      borderColor="onGrey"
      borderStyle="dashed"
      grow>
      {ModuleButtonContentComponent}
    </Box>
  ) : (
    <View
      style={styles.swipeToDeleteContainer}
      testID={testID}>
      <SwipeToDelete onEvent={onDelete}>
        <Pressable
          inset="md"
          onPress={() => navigation.navigate(slug)}
          variant={variant}>
          {ModuleButtonContentComponent}
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
