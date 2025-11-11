import type {ParkingMachine} from '@/modules/parking/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

type Props = {
  onPress: (parkingMachineId: ParkingMachine['id']) => void
  parkingMachine: ParkingMachine
}

export const ParkingMachineListItem = ({parkingMachine, onPress}: Props) => {
  if (!parkingMachine) {
    return null
  }

  return (
    <Box insetRight="md">
      <Pressable
        accessibilityLabel={`Parkeerautomaat ${parkingMachine.id}`}
        onPress={() => onPress(parkingMachine.id)}
        testID="ParkingMachineListItemButton">
        <Box insetVertical="sm">
          <Column>
            <Title
              accessible={false}
              color="link"
              level="h5"
              text={parkingMachine.id}
            />
            <Paragraph accessible={false}>{parkingMachine.address}</Paragraph>
          </Column>
        </Box>
      </Pressable>
    </Box>
  )
}
