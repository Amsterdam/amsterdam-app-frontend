import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {BurningGuideRisksButton} from '@/modules/burning-guide/components/BurningGuideRisksButton'

export const BurningGuideTipsScreen = () => (
  <Screen testID="BurningGuideTipsScreen">
    <Box
      insetBottom="xl"
      insetLeft="md"
      insetRight="md"
      insetTop="md">
      <Column gutter="lg">
        <Title text="Tips om bewuster te stoken" />
        <List
          items={[
            'Stook alleen schoon, droog en gekloofd kachelhout. Afval (bewerkt hout, karton en papier) is verboden.',
            'Zorg altijd voor goede luchttoevoer tijdens het stoken en het uitbranden.',
            'Laat het vuur uit bij windstil of mistig weer. ',
            "Stop 's avonds op tijd met stoken. Dovend vuur rookt nog lang na. Uw buren kunnen dan geen raam openzetten voor ventilatie.",
            'Laat de schoorsteen minstens 1 keer per jaar goed vegen.',
          ]}
          testID="BurningGuideTipsList"
        />
      </Column>
    </Box>
    <BurningGuideRisksButton />
  </Screen>
)
