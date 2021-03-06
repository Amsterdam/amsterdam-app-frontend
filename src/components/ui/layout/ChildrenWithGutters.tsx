import React, {Children, Fragment, ReactNode} from 'react'
import {Spacing} from '../../../tokens'
import {Gutter} from './'

type Props = {
  children: ReactNode[] | ReactNode
  gutter: keyof Spacing
  prop: 'height' | 'width'
}

export const ChildrenWithGutters = ({children, gutter, prop}: Props) => {
  let childrenArray = Children.toArray(children)

  return (
    <>
      {childrenArray.map((child: any, index: number) => (
        <Fragment key={child.key ?? `child-${index}`}>
          {child}
          {index < childrenArray.length - 1 && <Gutter {...{[prop]: gutter}} />}
        </Fragment>
      ))}
    </>
  )
}
