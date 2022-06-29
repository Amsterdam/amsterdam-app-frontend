import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useSelector} from 'react-redux'
import {selectAddress} from '@/modules/address/addressSlice'
import {useGetProjectsByDistanceQuery} from '@/modules/construction-work/construction-work.service'

type Params = {
  projectId?: string
}

export const useProjects = ({projectId}: Params = {}) => {
  const {primary: address} = useSelector(selectAddress)

  const addressParam = address
    ? {
        address: address.centroid[1] ? '' : address.adres ?? '',
        lat: address.centroid[1] ?? 0,
        lon: address.centroid[0] ?? 0,
      }
    : undefined

  const {
    isLoading: isLoadingProjectsByDistance,
    data: projectsByDistance,
    isError: projectsByDistanceHasError,
  } = useGetProjectsByDistanceQuery(addressParam ?? skipToken)

  const {isLoadingProjectByDistance, projectByDistance} =
    useGetProjectsByDistanceQuery(addressParam ?? skipToken, {
      selectFromResult: ({data, isLoading}) => ({
        isLoadingProjectByDistance: isLoading,
        projectByDistance: data?.find(p => p.identifier === projectId),
      }),
      skip: !projectId,
    })

  return {
    isLoadingProjectByDistance,
    isLoadingProjectsByDistance,
    projectByDistance,
    projectsByDistance,
    projectsByDistanceHasError,
  }
}
