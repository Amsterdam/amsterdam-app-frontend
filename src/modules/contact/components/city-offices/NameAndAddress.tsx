import {useDispatch} from 'react-redux'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {CityOffice} from '@/modules/contact/types'
import {toggleBottomSheet} from '@/store/slices/bottomSheet'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = Pick<CityOffice, 'address' | 'addressContent' | 'title'>

export const NameAndAddress = ({address, addressContent, title}: Props) => {
  const dispatch = useDispatch()

  return (
    <Column gutter="md">
      <TopTaskButton
        accessibilityHint="Tik om een ander stadsloket te selecteren."
        iconName="city-office"
        onPress={() => dispatch(toggleBottomSheet())}
        testID="ContactCurrentCityOfficeButton"
        text={
          <SingleSelectable
            accessibilityLabel={accessibleText(
              `${address.streetName} ${address.streetNumber}`,
              address.postalCode,
              address.city,
            )}>
            <Phrase variant="small">
              {address.streetName} {address.streetNumber}
            </Phrase>
            <Phrase variant="small">
              {address.postalCode} {address.city}
            </Phrase>
          </SingleSelectable>
        }
        title={title}
        titleIconName="chevron-down"
      />
      {!!addressContent && (
        <>
          <Title
            level="h5"
            text={addressContent.title}
          />
          {/* TODO Make this either HTML or text in our database. */}
          <Paragraph>{addressContent.html}</Paragraph>
        </>
      )}
    </Column>
  )
}
