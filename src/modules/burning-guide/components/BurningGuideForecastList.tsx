import {StyleSheet, View} from 'react-native'
import type {ListItem} from '@/modules/burning-guide/types'
import type {Theme} from '@/themes/themes'
import type {PropsWithChildren} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {BurningGuideForecastListItem} from '@/modules/burning-guide/components/BurningGuideForecastListItem'
import {useThemable} from '@/themes/useThemable'

type BurningGuideForecastListProps = {list: ListItem[]}

export const BurningGuideForecastList = ({
  list,
}: BurningGuideForecastListProps) => (
  <Column>
    <Title text="Verwachting" />

    <Column>
      <BurningGuideForecastList.Row />

      {list.map((item, index) => (
        <BurningGuideForecastList.Row key={item.id}>
          <BurningGuideForecastListItem
            isFixed={item.isFixed}
            testID={`BurningGuideForecast${index}ListItem`}
            timeWindow={item.timeWindow}
            variant={item.variant}
          />
        </BurningGuideForecastList.Row>
      ))}
    </Column>
    <Box insetVertical="md">
      <Paragraph color="secondary">
        * Deze verwachting kan nog veranderen.
      </Paragraph>
    </Box>
  </Column>
)

const BurningGuideForecastListItemWrapper = ({children}: PropsWithChildren) => {
  const styles = useThemable(createStyles)

  return <View style={styles.row}>{children}</View>
}

BurningGuideForecastList.Row = BurningGuideForecastListItemWrapper

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    row: {
      borderBottomWidth: size.spacing.xxs,
      borderColor: color.box.border.onGrey,
      paddingVertical: size.spacing.sm,
    },
  })
