import {CSSProperties} from 'react'
import {baseColor} from '@/themes/tokens/base-color'

export const Block = ({label}: {label?: string}) => (
  <div style={styles}>{!!label && <span>{label}</span>}</div>
)

const styles: CSSProperties = {
  backgroundColor: baseColor.primary.blue,
  color: baseColor.primary.white,
  display: 'flex',
  flex: 1,
  fontFamily: 'AmsterdamSans-Regular',
  justifyContent: 'center',
  padding: 32,
}
