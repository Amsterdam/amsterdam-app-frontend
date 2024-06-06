import {useMemo} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  azureGroups,
  AzureGroup,
} from '@/modules/construction-work-editor/constants/azureGroups'
import {useGetDecodedAccessToken} from '@/modules/construction-work-editor/hooks/useGetDecodedAccessToken'
import {selectEnvironment} from '@/store/slices/environment'

export const useGetAuthorizedGroups = () => {
  const decodedToken = useGetDecodedAccessToken()
  const {groups = []} = decodedToken ?? {groups: []}
  const azureGroupNames = Object.keys(azureGroups) as AzureGroup[]
  const environment = useSelector(selectEnvironment).environment

  return useMemo(
    () =>
      azureGroupNames.filter(groupName =>
        groups.includes(azureGroups[groupName][environment]),
      ),
    [azureGroupNames, environment, groups],
  )
}
