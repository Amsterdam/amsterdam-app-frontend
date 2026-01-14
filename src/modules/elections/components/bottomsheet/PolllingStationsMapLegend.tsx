import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {stateMap} from '@/modules/elections/constants'
import {useBottomSheet} from '@/store/slices/bottomSheet'

const sortedStateMap = Object.entries(stateMap).sort(([a], [b]) => {
  const keyA = Number.parseInt(a, 10)
  const keyB = Number.parseInt(b, 10)

  if (keyB === 0) {
    return -1
  }

  return keyA - keyB
})

export const PollingStationsMapLegend = () => {
  const {close: closeBottomSheet} = useBottomSheet()

  const autoFocus = useAccessibilityFocus()

  return (
    <Box>
      <Column gutter="lg">
        <Row align="between">
          <Title
            level="h3"
            ref={autoFocus}
            text="Kaartlagen"
          />
          <IconButton
            accessibilityLabel="Sluit legenda venster"
            icon={
              <Icon
                name="close"
                size="ml"
              />
            }
            onPress={closeBottomSheet}
            testID="PollingStationsMapLegendCloseButton"
          />
        </Row>
        <Column gutter="sm">
          <Title
            level="h5"
            text="Drukte nu"
          />
          {sortedStateMap.map(([_, {label, icon, color}]) => (
            <Row
              gutter="sm"
              key={label}>
              <Icon
                color={color}
                name={icon}
              />
              <Phrase>{label}</Phrase>
            </Row>
          ))}
        </Column>
      </Column>
    </Box>
  )
}
