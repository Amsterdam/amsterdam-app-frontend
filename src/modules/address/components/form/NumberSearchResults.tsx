import type {Address, BaseAddress} from '@/modules/address/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {NumberSearchAnimation} from '@/modules/address/components/form/NumberSearchAnimation'
import {NumberSearchBackPressButton} from '@/modules/address/components/form/NumberSearchBackPressButton'
import {NumberSearchResult} from '@/modules/address/components/form/NumberSearchResult'
import {useGetAddressFormList} from '@/modules/address/hooks/useGetAddressFormList'

export const NumberSearchResults = ({
  onPressBack,
  onPressResult,
}: {
  onPressBack: () => void
  onPressResult: (item: Address | BaseAddress) => void
}) => {
  const {
    data: list,
    isError,
    isFetching,
    refetch,
  } = useGetAddressFormList('number')

  return (
    <NumberSearchAnimation>
      <Column>
        <Row align="start">
          <NumberSearchBackPressButton onPressBack={onPressBack} />
        </Row>

        <NumberSearchResult
          bagList={list}
          isError={isError}
          isLoading={isFetching}
          onPressResult={onPressResult}
          refetch={refetch}
        />
      </Column>
    </NumberSearchAnimation>
  )
}
