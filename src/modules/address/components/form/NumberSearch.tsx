import {useEffect, useRef} from 'react'
import {type TextInput} from 'react-native'
import type {Address, BaseAddress} from '@/modules/address/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {NumberSearchAnimation} from '@/modules/address/components/form/NumberSearchAnimation'
import {NumberSearchBackPressButton} from '@/modules/address/components/form/NumberSearchBackPressButton'
import {NumberSearchField} from '@/modules/address/components/form/NumberSearchField'
import {NumberSearchResult} from '@/modules/address/components/form/NumberSearchResult'
import {useGetAddressFormList} from '@/modules/address/hooks/useGetAddressFormList'

export const NumberSearch = ({
  onPressBack,
  onPressResult,
}: {
  onPressBack: () => void
  onPressResult: (item: Address | BaseAddress) => void
}) => {
  const inputRef = useRef<TextInput>(null)

  const {
    data: list,
    isError,
    isFetching,
    refetch,
    shouldShowList,
  } = useGetAddressFormList('number')

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef])

  return (
    <NumberSearchAnimation
      onAnimationFinished={() => inputRef.current?.focus()}>
      <Column>
        <Row align="start">
          <NumberSearchBackPressButton onPressBack={onPressBack} />
        </Row>

        <NumberSearchField ref={inputRef} />

        {!!list?.length && !!shouldShowList && (
          <NumberSearchResult
            bagList={list}
            isError={isError}
            isLoading={isFetching}
            refetch={refetch}
            selectResult={onPressResult}
          />
        )}
      </Column>
    </NumberSearchAnimation>
  )
}
