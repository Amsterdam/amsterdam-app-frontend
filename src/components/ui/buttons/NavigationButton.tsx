import {TextProps} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Phrase, PhraseProps} from '@/components/ui/text/Phrase'
import {IconSize, TestProps} from '@/components/ui/types'

type Props = {
  accessibilityLanguage?: TextProps['accessibilityLanguage']
  accessibilityRole?: 'link' | 'button'
  description?: string
  direction?: 'backward' | 'forward'
  emphasis?: PhraseProps['emphasis']
  icon?: SvgIconName
  iconSize?: keyof typeof IconSize
  inset?: boolean
  onPress: () => void
  title: string
} & TestProps

export const NavigationButton = ({
  description,
  direction = 'forward',
  emphasis = 'strong',
  icon,
  iconSize = 'lg',
  inset = true,
  title,
  onPress,
  testID,
  accessibilityRole = 'link',
  accessibilityLanguage = 'nl-NL',
}: Props) => (
  <Pressable
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
        <Column>
          <Row
            gutter="md"
            shrink={0}>
            {!!icon && (
              <Icon
                color="link"
                name={icon}
                size="lg"
                testID={`${testID}Icon`}
              />
            )}
            <Phrase
              color="link"
              emphasis={emphasis}
              testID="NavigationButtonTitle">
              {title}
            </Phrase>
          </Row>
          {!!description && (
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
