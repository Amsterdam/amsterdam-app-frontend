import {ReactNode} from 'react'
import {TextProps} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Phrase, PhraseProps} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {IconSize, TestProps} from '@/components/ui/types'

type Props = {
  Icon?: ReactNode
  accessibilityLabel?: string
  accessibilityLanguage?: TextProps['accessibilityLanguage']
  accessibilityRole?: 'link' | 'button'
  description?: string
  direction?: 'backward' | 'forward'
  emphasis?: PhraseProps['emphasis']
  iconName?: SvgIconName
  iconSize?: keyof typeof IconSize
  inset?: boolean
  isDescriptionBelowIcon?: boolean
  onPress: () => void
  title: string
} & TestProps

export const NavigationButton = ({
  description,
  direction = 'forward',
  emphasis = 'strong',
  iconName,
  iconSize = 'lg',
  inset = true,
  isDescriptionBelowIcon = true,
  title,
  onPress,
  testID,
  accessibilityRole = 'link',
  accessibilityLanguage = 'nl-NL',
  accessibilityLabel,
  ...props
}: Props) => (
  <Pressable
    accessibilityLabel={accessibilityLabel}
    accessibilityLanguage={accessibilityLanguage}
    accessibilityRole={accessibilityRole}
    onPress={onPress}
    testID={testID}>
    <Box
      insetHorizontal={inset ? 'md' : 'no'}
      insetVertical={inset ? 'sm' : 'no'}>
      <Row
        align="between"
        gutter="md">
        {direction === 'backward' && (
          <Icon
            color="link"
            name="chevron-left"
            size={iconSize}
            testID={`${testID}Icon`}
          />
        )}
        <Column shrink={1}>
          <Row
            gutter="md"
            shrink={0}>
            {!!iconName && (
              <Icon
                color="link"
                name={iconName}
                size="lg"
                testID={`${testID}Icon`}
              />
            )}
            {!!props.Icon && !iconName ? props.Icon : null}
            <Column shrink={1}>
              {emphasis === 'strong' ? (
                <Title
                  color="link"
                  level="h5"
                  testID="NavigationButtonTitle"
                  text={title}
                />
              ) : (
                <Phrase
                  color="link"
                  testID="NavigationButtonTitle">
                  {title}
                </Phrase>
              )}
              {!!description && !isDescriptionBelowIcon && (
                <Phrase testID="NavigationButtonDescription">
                  {description}
                </Phrase>
              )}
            </Column>
          </Row>
          {!!description && !!isDescriptionBelowIcon && (
            <Phrase testID="NavigationButtonDescription">{description}</Phrase>
          )}
        </Column>
        {direction === 'forward' && (
          <Icon
            color="link"
            name="chevron-right"
            size={iconSize}
            testID={`${testID}Icon`}
          />
        )}
      </Row>
    </Box>
  </Pressable>
)
