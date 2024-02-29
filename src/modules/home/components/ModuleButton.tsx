import {ElementType, useCallback, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {SwipeToDelete} from '@/components/ui/buttons/SwipeToDelete'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {IconName} from '@/components/ui/media/iconPaths'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {InactiveModuleMessage} from '@/modules/home/components/InactiveModuleMessage'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {toggleModule} from '@/store/slices/modules'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type ModuleButtonContentProps = {
  badgeValue?: ElementType
  disabled: boolean | undefined
  iconName: IconName | 'projects'
  label: string
  variant: ButtonVariants
} & TestProps

const ModuleButtonContent = ({
  badgeValue: BadgeValue,
  disabled,
  iconName,
  label,
  testID,
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
              testID={`${testID}Icon`}
            />
          ) : (
            !!iconName && (
              <Icon
                color={color}
                name={iconName}
                size="lg"
                testID={`${testID}Icon`}
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
  alwaysEnabled?: boolean
  badgeValue?: ElementType
  disabled?: boolean
  iconName: IconName | 'projects'
  label: string
  slug: ModuleSlug
  variant?: ButtonVariants
} & TestProps

export const ModuleButton = ({
  alwaysEnabled = false,
  badgeValue,
  disabled,
  iconName,
  label,
  slug,
  testID,
  variant = 'tertiary',
}: ModuleButtonProps) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<HomeRouteName>()

  const styles = useThemable(createStyles)

  const onDelete = useCallback(() => {
    dispatch(toggleModule(slug))
  }, [slug, dispatch])

  const button = useMemo(
    () => (
      <ModuleButtonContent
        badgeValue={badgeValue}
        disabled={disabled}
        iconName={iconName}
        label={label}
        testID={testID}
        variant={variant}
      />
    ),
    [badgeValue, disabled, iconName, label, testID, variant],
  )

  const pressable = useMemo(
    () => (
      <Pressable
        inset="md"
        onPress={() => {
          navigation.navigate(slug)
        }}
        testID={`${testID}Button`}
        variant={variant}>
        {button}
      </Pressable>
    ),
    [button, navigation, slug, testID, variant],
  )

  if (disabled) {
    return (
      <Box
        borderColor="onGrey"
        borderStyle="dashed"
        grow>
        {button}
      </Box>
    )
  }

  return (
    <View
      style={styles.swipeToDeleteContainer}
      testID={testID}>
      {alwaysEnabled ? (
        pressable
      ) : (
        <SwipeToDelete
          onEvent={onDelete}
          testID={testID ? `${testID}SwipeToDelete` : ''}>
          {pressable}
        </SwipeToDelete>
      )}
    </View>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    swipeToDeleteContainer: {
      backgroundColor: color.box.background.invalid,
    },
  })
