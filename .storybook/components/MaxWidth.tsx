import * as CSS from 'csstype'
import React, {ReactNode} from 'react'

type Props = {
  children: ReactNode
  width: CSS.Property.MaxWidth
}

export const MaxWidth = ({children, width}: Props) => (
  <div style={{maxWidth: width}}>{children}</div>
)
