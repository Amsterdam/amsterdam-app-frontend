import {useEffect, useRef} from 'react'
import type {Address, BaseAddress} from '@/modules/address/types'

import type {TextInput} from 'react-native'
import {StreetSearchField} from '@/modules/address/components/form/StreetSearchField'
import {StreetSearchResult} from '@/modules/address/components/form/StreetSearchResult'
import {useGetAddressFormList} from '@/modules/address/hooks/useGetAddressFormList'

export const StreetSearch = ({
  onPressResult,
}: {
  onPressResult: (item: Address | BaseAddress) => void
}) => {
  const inputRef = useRef<TextInput>(null)

  const {
    data: list,
    isError,
    isFetching,
    refetch,
    shouldShowList,
  } = useGetAddressFormList('street')

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef])

  return (
    <>
      <StreetSearchField ref={inputRef} />

      {!!list?.length && !!shouldShowList && (
        <StreetSearchResult
          bagList={list}
          isError={isError}
          isLoading={isFetching}
          refetch={refetch}
          selectResult={onPressResult}
        />
      )}
    </>
  )
}
