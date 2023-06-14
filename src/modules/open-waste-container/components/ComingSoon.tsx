import {ImageSourcePropType} from 'react-native'
import {Box} from '@/components/ui/containers'
import {Column} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'

export const ComingSoon = () => (
  <Column>
    <Image
      source={
        require('@/modules/open-waste-container/assets/images/open-waste-container-coming-soon.jpg') as ImageSourcePropType
      }
      testID="OpenWasteContainerComingSoonImage"
    />
    <Box
      insetHorizontal="md"
      insetVertical="lg">
      <Column gutter="md">
        <Title
          testID="OpenWasteContainerComingSoonTitle"
          text="Open een gft-container met deze app"
        />
        <Paragraph
          testID="OpenWasteContainerComingSoonIntroParagraph"
          variant="intro">
          Vanaf volgend jaar kunt u een gft-container openen met uw telefoon. U
          kunt dit dan op deze pagina activeren.
        </Paragraph>
        <Paragraph testID="OpenWasteContainerComingSoonParagraph">
          We vervangen de plastic passen om kosten te besparen én minder plastic
          is ook beter voor het milieu. Op een gft-container zit een slot zodat
          er niet zomaar ander afval in gegooid kan worden. Hierdoor is het
          afval van hogere kwaliteit en kunnen we meer recyclen.
        </Paragraph>
      </Column>
    </Box>
  </Column>
)
