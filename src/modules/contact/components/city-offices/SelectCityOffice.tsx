import {Fragment} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocusWhenBottomsheetIsOpen} from '@/hooks/accessibility/useAccessibilityFocusWhenBottomsheetIsOpen'
import {CityOfficeButton} from '@/modules/contact/components/city-offices/CityOfficeButton'
import {useGetCityOfficesQuery} from '@/modules/contact/service'

export const SelectCityOffice = () => {
  const focusRef = useAccessibilityFocusWhenBottomsheetIsOpen()
  const {data: cityOffices, isLoading} = useGetCityOfficesQuery()

  if (isLoading || !cityOffices) {
    return <PleaseWait />
  }

  return (
    <Box grow>
      <Title
        accessibilityHint="selecteer een stadsloket"
        level="h3"
        ref={focusRef}
        text="Stadsloketten"
      />
      <Gutter height="md" />
      {cityOffices.map(cityOffice => (
        <Fragment key={cityOffice.identifier}>
          <CityOfficeButton cityOffice={cityOffice} />
          <Gutter height="sm" />
        </Fragment>
      ))}
      <Gutter height="md" />
    </Box>
  )
}
