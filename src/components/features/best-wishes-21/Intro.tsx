import React from 'react'
import {View} from 'react-native'
import {size} from '../../../tokens'
import {Text, Title} from '../../ui'
import {Gutter} from '../../ui/layout'

export const Intro = () => (
  <View>
    <Title text="Terugblikken & vooruitkijken" />
    <Title level={3} subtitle text="Eén app voor de Amsterdammer" />
    <Gutter height={size.spacing.md} />
    <Text intro>
      Afgelopen jaar zijn we begonnen aan één app voor de Amsterdammer. We zijn
      erin geslaagd een mooie basis neer te zetten waarop we kunnen
      doorontwikkelen. Het resultaat heeft u in handen.
    </Text>
  </View>
)
