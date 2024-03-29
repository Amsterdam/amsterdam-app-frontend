import {useEffect} from 'react'
import {Linking} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {Column} from '@/components/ui/layout/Column'
import {Screen} from '@/components/ui/layout/Screen'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {Permissions} from '@/types/permissions'

export const LocationPermissionInstructionsScreen = () => {
  const {goBack} = useNavigation()
  const {hasPermission} = usePermission(Permissions.location)

  useEffect(() => {
    if (hasPermission) {
      goBack()
    }
  }, [goBack, hasPermission])

  return (
    <Screen
      stickyFooter={
        <Box>
          <Button
            label="Ga naar instellingen"
            onPress={() => Linking.openSettings()}
            testID="AddressLocationPermissionInstructionModalCloseButton"
          />
        </Box>
      }
      stickyHeader={
        <ModalHeader
          testID="AddressLocationPermissionInstructionModalHeader"
          title="Locatie delen"
        />
      }
      testID="AddressLocationPermissionInstructionScreen">
      <Box
        insetHorizontal="md"
        insetVertical="xxl">
        <Column gutter="md">
          <Title
            text="Geef je locatie door"
            textAlign="center"
          />
          <Paragraph
            textAlign="center"
            variant="intro">
            Ontdek hoe je je locatie aanzet, zodat je altijd relevante
            informatie ziet.
          </Paragraph>
        </Column>
      </Box>
    </Screen>
  )
}
