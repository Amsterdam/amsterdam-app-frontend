import {ReactNode, useCallback, useState} from 'react'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
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
  grow?: boolean
  initiallyExpanded?: boolean
  onChangeExpanded?: (state: boolean) => void
  title: string
}

export const Accordion = ({
  grow,
  initiallyExpanded,
  onChangeExpanded,
  children,
  title,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(!!initiallyExpanded)
  const isExpandable = children !== undefined
  const iconName = isExpanded ? 'chevron-up' : 'chevron-down'
  const {text} = useTheme()

  const handleStateChange = useCallback(
    (state: boolean) => {
      setIsExpanded(state)
      onChangeExpanded?.(state)
    },
    [onChangeExpanded],
  )

  if (!isExpandable) {
    return <AccordionTitle title={title} />
  }

  return (
    <Column grow={grow}>
      <Pressable
        accessibilityHint={`${title}, Dubbeltik om de inhoud te ${
          isExpanded ? 'verbergen' : 'bekijken'
        }`}
        accessibilityState={{expanded: isExpanded}}
        onPress={() => handleStateChange(!isExpanded)}>
        <AccordionTitle
          icon={
            <Size height={text.lineHeight.h5}>
              <Icon
                color="link"
                name={iconName}
                size="lg"
              />
            </Size>
          }
          title={title}
        />
      </Pressable>
      {!!isExpanded && (
        <AccordionPanel>
          <>{children}</>
        </AccordionPanel>
      )}
    </Column>
  )
}
