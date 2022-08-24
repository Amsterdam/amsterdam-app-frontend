import React, {Children, Fragment, ReactNode} from 'react'
import {Divider} from '@/components/ui/Divider'

type Props = {
  children: ReactNode
}

export const List = ({children}: Props) => {
  const childrenArray = Children.toArray(children)

  if (!childrenArray.length) {
    return null
  }

  return (
    <>
      {childrenArray.map((child, index: number) => (
        <Fragment
          key={
            typeof child === 'object' && (child as Record<string, string>).key
              ? (child as Record<string, string>).key
              : `child-${index}`
          }>
          {child}
          {index < childrenArray.length - 1 && <Divider />}
        </Fragment>
      ))}
    </>
  )
}
