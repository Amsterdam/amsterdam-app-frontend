import {SHA256EncryptedDeviceId} from '@/utils/encryption'

export const deviceIdHeader = {deviceid: SHA256EncryptedDeviceId}
