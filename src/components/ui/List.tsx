import React, {Children, Fragment, ReactNode} from 'react'
import {Divider} from './Divider'

type Props = {
  children: ReactNode
  dividerBottom?: boolean
  dividerTop?: boolean
}

export const List = ({children, dividerBottom, dividerTop}: Props) => {
  let childrenArray = Children.toArray(children)

  if (!childrenArray.length) {
    return null
  }

  return (
    <>
      {dividerTop && <Divider />}
      {childrenArray.map((child: any, index: number) => (
        <Fragment key={child.key ?? `child-${index}`}>
          {child}
          {index < childrenArray.length - 1 && <Divider />}
        </Fragment>
      ))}
      {dividerBottom && <Divider />}
    </>
  )
}
