import {licensePlatesMock} from '@/modules/parking/mocks/licensePlates.mock'

export const useGetLicensePlates = () => ({
  licensePlates: licensePlatesMock,
  isLoading: false,
})
