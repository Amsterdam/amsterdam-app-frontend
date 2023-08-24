import {Linking} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {Column} from '@/components/ui/layout/Column'
import {Screen} from '@/components/ui/layout/Screen'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useAppState} from '@/hooks/useAppState'
import {requestLocationPermission} from '@/utils/permissions'

export const LocationPermissionInstructionsScreen = () => {
  const navigation = useNavigation()

  useAppState({
    onForeground: () => {
      void requestLocationPermission().then(() => {
        navigation.goBack()
      })
    },
  })

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
        <Column
          gutter="md"
          halign="center">
          <Title text="Geef je locatie door" />
          <Phrase
            align="center"
            variant="intro">
            Ontdek hoe je je locatie aanzet, zodat je altijd relevante
            informatie ziet.
          </Phrase>
        </Column>
      </Box>
    </Screen>
  )
}
