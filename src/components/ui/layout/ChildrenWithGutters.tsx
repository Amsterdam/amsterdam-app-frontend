import {Children, Fragment, ReactNode} from 'react'
import {Gutter} from '@/components/ui/layout'
import {SpacingTokens} from '@/themes/tokens'

type Props = {
  children: ReactNode[] | ReactNode
  gutter: keyof SpacingTokens
  prop: 'height' | 'width'
}

export const ChildrenWithGutters = ({children, gutter, prop}: Props) => {
  const childrenArray = Children.toArray(children)

  return (
    <>
      {childrenArray.map((child, index: number) => (
        <Fragment
          key={
            typeof child === 'object' &&
            (child as unknown as Record<string, string>).key
              ? (child as unknown as Record<string, string>).key
              : `child-${index}`
          }>
          {child}
          {index < childrenArray.length - 1 && <Gutter {...{[prop]: gutter}} />}
        </Fragment>
      ))}
    </>
  )
}
