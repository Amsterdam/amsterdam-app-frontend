import React from 'react'
import {Paragraph} from '@/components/ui/text'

type Props = {
  maxCharacters: number
  numOfCharacters: number
}

export const CharactersLeftDisplay = ({
  maxCharacters,
  numOfCharacters,
}: Props) => {
  return <Paragraph>{`${numOfCharacters}/${maxCharacters}`}</Paragraph>
}
