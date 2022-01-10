import React from 'react'
import {Text} from '../../ui'

export const CharactersLeftDisplay = ({
  charactersLeft,
}: {
  charactersLeft: number
}) => {
  return <Text secondary>Maximaal {charactersLeft} letters of tekens</Text>
}
