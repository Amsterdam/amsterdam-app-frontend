import {permitMock} from '@/modules/parking/mocks/permit.mock'

export const useGetCurrentParkingPermit = () => ({
  currentPermit: permitMock,
  isLoading: false,
  refetch: () => null,
})
