import {useEffect, useState} from 'react'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {useProjectsQuery} from '@/modules/construction-work/service'

export const PreRenderComponent = () => {
  const {registerDeviceIfPermitted} = useRegisterDevice()
  const [hasFetched, setHasFetched] = useState(false)
  const {data} = useProjectsQuery({page_size: 1, page: 1}, {skip: hasFetched})

  // At app startup, ask permission for push notifications if the user is following a project
  useEffect(() => {
    if (data?.result?.[0].followed) {
      setHasFetched(true)
      void registerDeviceIfPermitted(true)
    }
  }, [data?.result, registerDeviceIfPermitted])

  return null
}
