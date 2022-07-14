import React from 'react'
import {Box} from '@/components/ui'
import {Column} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'

export const ComingSoon = () => (
  <Column>
    <Image
      source={require('@/assets/images/open-waste-container-coming-soon.jpg')}
    />
    <Box insetHorizontal="md" insetVertical="lg">
      <Column gutter="md">
        <Title text="Open een GFT-container met deze app" />
        <Paragraph>
          Vanaf volgend jaar kunt u een GFE-container openen met uw telefoon. U
          kunt dit dan op deze pagina activeren.
        </Paragraph>
        <Paragraph>
          We vervangen de plastic passen om kosten te besparen én minder plastic
          is ook beter voor het milieu. Op een GFE-container zit een slot zodat
          er niet zomaar ander afval in gegooid kan worden. Hierdoor is het
          afval van hogere kwaliteit en kunnen we meer recyclen.
        </Paragraph>
      </Column>
    </Box>
  </Column>
)
