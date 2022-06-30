import {Platform} from 'react-native'
import {baseApi} from '@/services/init'
import {MutationResponse} from '@/types/api'

type DeviceRegistrationQueryArg = {
  firebase_token: string
}

export const deviceRegistrationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    registerDevice: builder.mutation<
      MutationResponse,
      DeviceRegistrationQueryArg
    >({
      query(body) {
        return {
          url: '/device/register',
          method: 'POST',
          body: {
            os: Platform.OS,
            ...body,
          },
        }
      },
    }),
  }),
})

export const {useRegisterDeviceMutation} = deviceRegistrationApi
