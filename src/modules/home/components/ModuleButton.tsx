import {useCallback, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {SwipeToDelete} from '@/components/ui/buttons/SwipeToDelete'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
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
  disabled: boolean | undefined
  iconName: SvgIconName | 'projects'
  label: string
  variant: ButtonVariants
} & TestProps

const ModuleButtonContent = ({
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
      {!!disabled && <InactiveModuleMessage />}
    </Column>
  )
}

type ButtonVariants = 'primary' | 'tertiary'

type ModuleButtonProps = {
  alwaysEnabled?: boolean
  disabled?: boolean
  iconName: SvgIconName | 'projects'
  label: string
  slug: ModuleSlug
  variant?: ButtonVariants
} & TestProps

export const ModuleButton = ({
  alwaysEnabled = false,
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
        disabled={disabled}
        iconName={iconName}
        label={label}
        testID={testID}
        variant={variant}
      />
    ),
    [disabled, iconName, label, testID, variant],
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
      backgroundColor: color.swipeToDelete.background,
    },
  })
