import React, {ReactNode} from 'react'
import {Spacing} from '../../../tokens'
import {Gutter} from './'

type Props = {
  children: ReactNode[] | ReactNode
  gutter: keyof Spacing
  prop: 'height' | 'width'
}

export const ChildrenWithGutters = ({children, gutter, prop}: Props) => {
  let childrenArray = React.Children.toArray(children)

  return (
    <>
      {childrenArray.map((child: any, index: number) => (
        <React.Fragment key={child.key ?? `child-${index}`}>
          {child}
          {index < childrenArray.length - 1 && <Gutter {...{[prop]: gutter}} />}
        </React.Fragment>
      ))}
    </>
  )
}
