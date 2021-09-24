import React from 'react'
import {Title} from '.'

type Props = {
  isAccessible: boolean | undefined
  text: string
}

export const Label = ({isAccessible, text}: Props) => {
  return (
    <Title
      accessible={isAccessible} // in case of iOS
      importantForAccessibility={isAccessible ? 'yes' : 'no'} // in case of Android
      level={4}
      text={text}
    />
  )
}
