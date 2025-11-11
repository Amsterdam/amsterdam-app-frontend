import type {ParkingSessionOrDummy} from '@/modules/parking/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {ParkingSessionNavigationButton} from '@/modules/parking/components/session/ParkingSessionNavigationButton'

export const ParkingSessionListRenderItem = ({
  item,
}: {
  item: ParkingSessionOrDummy
}) => (
  <Box
    insetHorizontal="md"
    insetTop="md">
    {item.dummy ? (
      <Skeleton isLoading>
        <NavigationButton
          onPress={() => null}
          testID="DummyNavigationButton"
          title="Laden"
        />
      </Skeleton>
    ) : (
      <ParkingSessionNavigationButton parkingSession={item} />
    )}
  </Box>
)
