import {StyleSheet} from 'react-native'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {type TestProps} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  text: string | string[]
} & TestProps

export const TooltipContent = ({testID, text}: Props) => {
  const styles = useThemable(createStyles)
  const paragraphs = typeof text === 'string' ? [text] : text

  return (
    <SingleSelectable
      accessibilityRole="text"
      accessible={false}
      style={styles.tooltip}
      testID={`${testID}Content`}>
      <Column gutter="sm">
        {paragraphs.map((paragraph, index) => (
          <Paragraph
            color="inverse"
            key={paragraph}
            testID={`${testID}Paragraph${index}`}
            variant="small">
            {paragraph}
          </Paragraph>
        ))}
      </Column>
    </SingleSelectable>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    tooltip: {
      padding: size.spacing.md,
      backgroundColor: color.tooltip.background,
    },
  })
