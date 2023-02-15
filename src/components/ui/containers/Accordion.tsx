import {ReactNode, useCallback, useState} from 'react'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers/Box'
import {Column, Gutter, Row, Size} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {useTheme} from '@/themes'

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
    <Row align="between" gutter="md" valign="start">
      <Title color="link" level="h5" text={title} />
      {icon}
    </Row>
  </Box>
)

type AccordionProps = {
  children: ReactNode | undefined
  initiallyExpanded?: boolean
  onChangeExpanded?: (state: boolean) => void
  title: string
}

export const Accordion = ({
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
    <Column>
      <Pressable
        accessibilityHint={`${title}, Dubbeltik om de inhoud te ${
          isExpanded ? 'verbergen' : 'bekijken'
        }`}
        accessibilityState={{expanded: isExpanded}}
        onPress={() => handleStateChange(!isExpanded)}>
        <AccordionTitle
          icon={
            <Size height={text.fontSize.h5 * text.lineHeight.h5}>
              <Icon color="link" name={iconName} size="lg" />
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
