import {View} from 'react-native'
import {CopyButton} from '@/components/ui/buttons/CopyButton'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'
import {VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

export const AppInfoCopyButtons = () => (
  <View>
    <CopyButton
      insetHorizontal="no"
      label={`Versie ${VERSION_NUMBER_WITH_BUILD}`}
      testID="AboutVersionNumberText"
      textToCopy={VERSION_NUMBER_WITH_BUILD}
      variant="transparent"
    />
    <CopyButton
      ellipsizeMode="tail"
      insetHorizontal="no"
      label={`Installatie-id ${SHA256EncryptedDeviceId}`}
      numberOfLines={1}
      testID="AboutInstallationIdText"
      textToCopy={SHA256EncryptedDeviceId}
      variant="transparent"
    />
  </View>
)
