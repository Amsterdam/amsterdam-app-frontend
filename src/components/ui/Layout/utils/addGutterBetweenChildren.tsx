import React, {ReactNode} from 'react'
import {Gutter} from '../..'
import {size, Spacing} from '../../../../tokens'

export const addGutterBetweenChildren = (
  children: ReactNode[] | ReactNode,
  gutter: keyof Spacing,
  prop: 'height' | 'width',
): ReactNode[] | ReactNode => {
  let childrenArray = React.Children.toArray(children)

  childrenArray = childrenArray.map((child: any, index: number) => {
    return (
      <React.Fragment key={child.key ?? `child-${index}`}>
        {child}
        {index < childrenArray.length - 1 && (
          <Gutter {...{[prop]: size.spacing[gutter]}} />
        )}
      </React.Fragment>
    )
  })

  return childrenArray
}
