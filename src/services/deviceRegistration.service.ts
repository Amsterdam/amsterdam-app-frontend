import {Platform} from 'react-native'
import {baseApi} from '@/services/init'
import {MutationResponse} from '@/types/api'
import {DeviceRegistrationEndpointName} from '@/types/device'

type DeviceRegistrationQueryArg = {
  firebase_token: string
}

export const deviceRegistrationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [DeviceRegistrationEndpointName.registerDevice]: builder.mutation<
      MutationResponse,
      DeviceRegistrationQueryArg
    >({
      query: body => ({
        url: '/device/register',
        method: 'POST',
        body: {
          os: Platform.OS,
          ...body,
        },
      }),
    }),
    [DeviceRegistrationEndpointName.unregisterDevice]: builder.mutation<
      MutationResponse,
      undefined
    >({
      query: () => ({
        url: '/device/register',
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useRegisterDeviceMutation, useUnregisterDeviceMutation} =
  deviceRegistrationApi
