import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {BurningGuide} from '@/modules/burning-guide/components/BurningGuide'
import {BurningGuideAddress} from '@/modules/burning-guide/components/BurningGuideAddress'
import {BurningGuideInfoButtons} from '@/modules/burning-guide/components/BurningGuideInfoButtons'

export const BurningGuideScreen = () => {
  const {address} = useSelectedAddress()

  return (
    <Screen testID="BurningGuideScreen">
      <Column
        grow={1}
        gutter="lg">
        <Box>
          <Column gutter="xl">
            <BurningGuideAddress address={address} />
            {!!address && <BurningGuide zipCode={address.postcode} />}
          </Column>
        </Box>
      </Column>
      <BurningGuideInfoButtons />
    </Screen>
  )
}
