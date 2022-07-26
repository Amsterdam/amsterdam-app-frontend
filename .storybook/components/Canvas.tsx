import * as CSS from 'csstype'
import React, {CSSProperties, ReactNode} from 'react'

type Props = {
  children: ReactNode
  height?: CSS.Property.Height
  highlight?: boolean
  maxHeight?: CSS.Property.MaxHeight
  maxWidth?: CSS.Property.MaxWidth
  width?: CSS.Property.Width
}

export const Canvas = (props: Props) => {
  const {highlight, children, ...otherProps} = props

  return (
    <div
      className={highlight ? 'highlight-layout' : undefined}
      style={{...otherProps, ...styles}}>
      {children}
    </div>
  )
}

const styles: CSSProperties = {
  display: 'flex',
}
