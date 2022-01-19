import React, {useContext} from 'react'
import {ScrollView} from 'react-native'
import {ProvideAddressBanner, QuickLinks} from '../components/features/home'
import {Box} from '../components/ui'
import {Column} from '../components/ui/layout'
import {AddressContext} from '../providers'

export const HomeScreen = () => {
  const addressContext = useContext(AddressContext)

  return (
    <ScrollView>
      <Box background="white">
        <Column gutter="lg">
          {!addressContext.address && <ProvideAddressBanner />}
          <QuickLinks />
        </Column>
      </Box>
    </ScrollView>
  )
}
