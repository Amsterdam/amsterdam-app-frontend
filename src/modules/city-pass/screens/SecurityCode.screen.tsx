import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'

export const SecurityCodeScreen = () => {
  useSetScreenTitle('Ryan')

  return (
    <CityPassLoginBoundaryScreen testID="CityPassSecurityCodeScreen">
      <Center grow>
        <Box>
          <Column
            gutter="lg"
            halign="center">
            <Title
              testID="CityPassSecurityCodeTitle"
              text="Beveiligingscode"
            />
            <Row>
              <Button
                label="Toon"
                testID="CityPassSecurityCodeButton"
                variant="secondary"
              />
            </Row>
            <Paragraph testID="CityPassSecurityCodeText">
              Deze code is strikt persoonlijk, deel deze niet met andere mensen.
            </Paragraph>
          </Column>
        </Box>
      </Center>
    </CityPassLoginBoundaryScreen>
  )
}
