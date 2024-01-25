import {Platform} from 'react-native'
import {ModuleSlug} from '@/modules/slugs'
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
        body: {
          os: Platform.OS,
          ...body,
        },
        method: 'POST',
        slug: ModuleSlug['construction-work'],
        url: '/device/register',
      }),
    }),
    [DeviceRegistrationEndpointName.unregisterDevice]: builder.mutation<
      MutationResponse,
      undefined
    >({
      query: () => ({
        method: 'DELETE',
        slug: ModuleSlug['construction-work'],
        url: '/device/register',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useRegisterDeviceMutation, useUnregisterDeviceMutation} =
  deviceRegistrationApi
