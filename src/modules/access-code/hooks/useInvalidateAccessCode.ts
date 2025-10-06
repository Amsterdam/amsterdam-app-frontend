import {useState, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setIsCodeValid} from '@/modules/access-code/slice'

export const useInvalidateAccessCode = () => {
  const [isReady, setIsReady] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsReady(false)
    dispatch(setIsCodeValid(false))
    setIsReady(true)
  }, [dispatch])

  return isReady
}
