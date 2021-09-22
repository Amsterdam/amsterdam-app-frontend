import React from 'react'
import {Text} from '../../ui'

export const CharactersLeftDisplay = ({
  charactersLeft,
}: {
  charactersLeft: number
}) => {
  return (
    <Text secondary>U kunt nog {charactersLeft} letters of tekens typen.</Text>
  )
}
