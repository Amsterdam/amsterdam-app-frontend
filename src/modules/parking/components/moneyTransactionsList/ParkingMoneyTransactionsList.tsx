import {useCallback, useMemo, useState} from 'react'
import {SectionList, SectionListProps} from 'react-native'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {
  parkingApi,
  useParkingTransactionsQuery,
} from '@/modules/parking/service'
import {
  ParkingEndpointName,
  ParkingOrderType,
  ParkingTransaction,
  ParkingTransactionsEndpointRequest,
} from '@/modules/parking/types'
import {groupParkingSessionsByDate} from '@/modules/parking/utils/groupParkingSessionsByDate'
import {formatNumber} from '@/utils/formatNumber'

const ListEmptyComponent = () => (
  <Title
    level="h3"
    testID="ParkingMoneyTransactionsNoTransactionsTitle"
    text="U heeft nog geen geldsaldo toegevoegd."
    textAlign="center"
  />
)

type ParkingTransactionOrDummy =
  | (ParkingTransaction & {dummy?: never; page: number})
  | {
      created_date_time: string
      dummy: true
      page: number
      ps_right_id: number
      start_date_time: string
    }
type Section = {
  data: Array<ParkingTransactionOrDummy>
  title: string
}

const dummyTitle = 'dummy'

const pageSize = 20

export const ParkingMoneyTransactionsList = () => {
  const [page, setPage] = useState(1)

  const result = useInfiniteScroller<
    ParkingTransaction,
    ParkingTransactionOrDummy,
    ParkingTransactionsEndpointRequest
  >(
    {
      created_date_time: '1970-01-01T00:00:00',
      creation_time: -1,
      dummy: true,
    } as unknown as ParkingTransactionOrDummy,
    parkingApi.endpoints[ParkingEndpointName.parkingTransactions],
    'created_date_time',
    useParkingTransactionsQuery,
    page,
    pageSize,
    {
      page_size: pageSize,
    },
  )

  const onViewableItemsChanged = useCallback<
    NonNullable<
      SectionListProps<
        ParkingTransactionOrDummy,
        Section
      >['onViewableItemsChanged']
    >
  >(
    ({viewableItems}) => {
      if (viewableItems.length > 0) {
        const items = viewableItems
          .flatMap(section => section.item)
          .filter(item => item.created_date_time)

        if (items.length === 0) {
          return
        }

        const lastViewableItems = items[items.length - 1]
        let newPage = lastViewableItems?.page

        if (lastViewableItems?.dummy && newPage) {
          const firstDummy = result.data.find(item => !!item.dummy)

          if (firstDummy && firstDummy.page < newPage) {
            newPage = firstDummy.page
          }
        }

        newPage && setPage(newPage)
      }
    },
    [result.data],
  )

  const sections = useMemo(() => {
    const transactionsOnly = result.data.filter(
      item => item.dummy || item.order_type === ParkingOrderType.recharge,
    )

    return groupParkingSessionsByDate(transactionsOnly, false)
  }, [result])

  return (
    <>
      <Box>
        <Row align="between">
          <Phrase emphasis="strong">Omschrijving</Phrase>
          <Phrase emphasis="strong">Bedrag</Phrase>
        </Row>
      </Box>
      <SectionList
        ListEmptyComponent={result.isLoading ? null : ListEmptyComponent}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({item}) =>
          item.dummy ? (
            <Box>
              <Skeleton isLoading>
                <Phrase>Laden...</Phrase>
              </Skeleton>
            </Box>
          ) : (
            <SingleSelectable>
              <Box
                insetBottom="md"
                insetHorizontal="md"
                insetTop="md">
                <Row align="between">
                  <Phrase emphasis="strong">
                    {item.order_type === ParkingOrderType.recharge
                      ? 'Geldsaldo opwaarderen'
                      : 'Geldsaldo teruggevorderd'}
                  </Phrase>
                  <Phrase
                    emphasis="strong"
                    flexShrink={0}>
                    {item.amount.value > 0 ? '+' : '-'}{' '}
                    {formatNumber(
                      Math.abs(item.amount.value),
                      item.amount.currency,
                    )}
                  </Phrase>
                </Row>
              </Box>
            </SingleSelectable>
          )
        }
        renderSectionFooter={() => <Gutter height="md" />}
        renderSectionHeader={({section}) => (
          <Box insetHorizontal="md">
            <Border
              key={section.title}
              top>
              <Gutter height="md" />
              <Phrase
                // emphasis="strong"
                testID="ParkingPlannedSessionDatePhrase">
                {section.title === dummyTitle ? ' ' : section.title}
              </Phrase>
            </Border>
          </Box>
        )}
        sections={sections}
        stickySectionHeadersEnabled={false}
      />
    </>
  )
}
