import React from 'react'
import {Timeline as TimelineType} from '../../../data/timeline'
import {Box} from '../Box'
import {Text} from '../Text'
import {TimelineItem} from './TimelineEntry'

type Props = {
  timeline: TimelineType
}

export const Timeline = ({timeline}: Props) => {
  return (
    <React.Fragment>
      <Box verticalPaddingOnly>
        <Text>{timeline.intro}</Text>
      </Box>
      {timeline.items.map((item, index) => {
        return (
          <React.Fragment key={item.title + index}>
            <TimelineItem item={item} />
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}
