import React, {CSSProperties, ReactNode} from 'react'

type Props = {
  children: ReactNode
  height?: string
  highlight?: boolean
  maxHeight?: string
  maxWidth?: string
  width?: string
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
