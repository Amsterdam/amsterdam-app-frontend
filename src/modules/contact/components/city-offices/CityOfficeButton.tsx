import React from 'react'
import {useDispatch} from 'react-redux'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {setSelectedCityOffice} from '@/modules/contact/slice'
import {CityOffice} from '@/modules/contact/types'
import {closeBottomSheet} from '@/store'

type Props = {
  cityOffice: CityOffice
}

export const CityOfficeButton = ({cityOffice}: Props) => {
  const dispatch = useDispatch()

  const selectCityOffice = (identifier: CityOffice['identifier']) => {
    dispatch(setSelectedCityOffice(identifier))
    dispatch(closeBottomSheet())
  }

  return (
    <Pressable onPress={() => selectCityOffice(cityOffice.identifier)}>
      <Box>
        <Row gutter="md">
          <Icon color="link" name="city-office" size={24} />
          <Title color="link" level="h5" text={cityOffice.title} />
        </Row>
      </Box>
    </Pressable>
  )
}
