import {type ReactNode, useCallback, useMemo, useState} from 'react'
import {Platform} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import {LogProps, PiwikDimension} from '@/processes/piwik/types'
import {useTheme} from '@/themes/useTheme'

const AccordionPanel = ({
  children,
}: Required<Pick<AccordionProps, 'children'>>) => (
  <>
    <Box insetHorizontal="md">{children}</Box>
    <Gutter height="md" />
  </>
)

type AccordionTitleProps = {
  icon?: ReactNode
} & Pick<AccordionProps, 'title'>

const AccordionTitle = ({icon, title}: AccordionTitleProps) => (
  <Box grow>
    <Row
      align="between"
      gutter="md"
      valign="start">
      <Title
        color="link"
        level="h5"
        numberOfLines={3}
        text={title}
      />
      {icon}
    </Row>
  </Box>
)

type AccordionProps = {
  children: ReactNode | undefined
  grow?: number
  initiallyExpanded?: boolean
  isExpandable?: boolean
  onChangeExpanded?: (state: boolean) => void
  title: string
} & TestProps &
  LogProps

export const Accordion = ({
  grow,
  initiallyExpanded,
  isExpandable = true,
  onChangeExpanded,
  children,
  testID,
  title,
  logAction,
  logDimensions = {},
  logName,
  logCategory,
  logValue,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(!!initiallyExpanded)
  const iconName = isExpanded ? 'chevron-up' : 'chevron-down'
  const {text} = useTheme()

  const handleStateChange = useCallback(
    (state: boolean) => {
      setIsExpanded(state)
      onChangeExpanded?.(state)
    },
    [onChangeExpanded],
  )

  const accessibilityLabel = useMemo(() => {
    const expandedText = isExpanded ? 'Uitgevouwen' : 'Samengevouwen'
    const platformSpecificText =
      Platform.OS === 'android'
        ? `${title}`
        : `${title}, dubbeltik om de inhoud te ${
            isExpanded ? 'verbergen' : 'bekijken'
          }`

    return `${expandedText}, ${platformSpecificText}.`
  }, [isExpanded, title])

  if (!isExpandable) {
    return <AccordionTitle title={title} />
  }

  return (
    <Column grow={grow}>
      <Pressable
        accessibilityActions={[
          {
            name: 'activate',
            label: !isExpanded
              ? 'het bekijken van de inhoud'
              : 'het verbergen van de inhoud',
          },
        ]}
        accessibilityLabel={accessibilityLabel}
        accessibilityLanguage="nl-NL"
        logAction={logAction}
        logCategory={logCategory}
        logDimensions={{
          ...logDimensions,
          // new state is the inverse of isExpanded
          [PiwikDimension.newState]: isExpanded ? 'closed' : 'open',
        }}
        logName={logName}
        logValue={logValue}
        onAccessibilityAction={event => {
          if (event.nativeEvent.actionName === 'activate') {
            handleStateChange(!isExpanded)
          }
        }}
        onPress={() => handleStateChange(!isExpanded)}
        testID={testID}>
        <AccordionTitle
          icon={
            <Size height={text.lineHeight.h5}>
              <Icon
                color="link"
                name={iconName}
                size="lg"
                testID={`${testID}Icon`}
              />
            </Size>
          }
          title={title}
        />
      </Pressable>
      {!!isExpanded && <AccordionPanel>{children}</AccordionPanel>}
    </Column>
  )
}
