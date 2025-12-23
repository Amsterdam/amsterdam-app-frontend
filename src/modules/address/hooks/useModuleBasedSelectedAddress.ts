import type {Address, LocationType} from '@/modules/address/types'
import type {RootState} from '@/store/types/rootState'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {usePiwikTrackLocationType} from '@/modules/address/hooks/usePiwikTrackLocationType'
import {moduleAddressFragments} from '@/modules/address/moduleAddressFragments'
import {
  addAddress as addMyAddress,
  setLocationType as setGlobalLocationType,
  useMyAddress,
  useGlobalLocationType,
  useLocation,
} from '@/modules/address/slice'
import {devError} from '@/processes/development'
import {ReduxKey} from '@/store/types/reduxKey'

const isAddress = (potentialAddress: unknown): potentialAddress is Address =>
  typeof potentialAddress === 'object' &&
  potentialAddress !== null &&
  'addressLine1' in potentialAddress

const isLocationType = (
  potentialLocationType: unknown,
): potentialLocationType is LocationType =>
  typeof potentialLocationType === 'string'

export const useModuleBasedSelectedAddress = (reduxKey: ReduxKey) => {
  const dispatch = useDispatch()
  const globalLocationType = useGlobalLocationType()
  const myAddress = useMyAddress()
  const {location, isGettingLocation} = useLocation()
  const trackPiwikLocationType = usePiwikTrackLocationType()

  const module = useSelector((state: RootState) => state[reduxKey])
  const fragment = moduleAddressFragments[reduxKey]

  if (!fragment) {
    if (reduxKey !== ReduxKey.address) {
      devError(
        `No address fragment registered for "${reduxKey}", If you want to use module specific address data, register the module slice in moduleAddressFragments and add to slice.`,
      )
    }

    const resultAddress =
      globalLocationType === 'location' ? location : myAddress

    return {
      myAddress,
      address: resultAddress,
      hasValidAddress: !!resultAddress,
      isFetchingLocation:
        globalLocationType === 'location' && isGettingLocation,
      locationType: globalLocationType,
      addAddress: (address: Address) => {
        dispatch(addMyAddress(address))
      },
      setLocationType: (locationType: LocationType) => {
        dispatch(setGlobalLocationType({locationType}))
        trackPiwikLocationType(locationType, globalLocationType)
      },
    }
  }

  const {addAddress: addModuleAddress, setLocationType: setModuleLocationType} =
    fragment.actions

  const moduleAddress =
    'address' in module && isAddress(module.address)
      ? module.address
      : undefined

  const moduleLocationType =
    'locationType' in module && isLocationType(module.locationType)
      ? module.locationType
      : 'address'

  const resultAddress =
    moduleLocationType === 'location' ? location : (moduleAddress ?? myAddress)

  return {
    myAddress,
    address: resultAddress,
    hasValidAddress: !!resultAddress,
    isFetchingLocation: moduleLocationType === 'location' && isGettingLocation,
    locationType: moduleLocationType,
    addAddress: (address: Address) => {
      dispatch(addModuleAddress(address))
    },
    setLocationType: (locationType: LocationType) => {
      dispatch(setModuleLocationType({locationType}))
      trackPiwikLocationType(locationType, moduleLocationType, reduxKey)
    },
  }
}
