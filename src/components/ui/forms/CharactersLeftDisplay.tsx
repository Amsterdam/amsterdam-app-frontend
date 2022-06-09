import React from 'react'
import {Text} from '..'

export const CharactersLeftDisplay = ({
  charactersLeft,
}: {
  charactersLeft: number
}) => {
  return <Text secondary>Maximaal {charactersLeft} letters of tekens</Text>
}
