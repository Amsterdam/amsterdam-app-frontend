import {ReactNode, forwardRef, useMemo} from 'react'
import {Text, TextProps} from 'react-native'

interface AccessibleTextProps extends TextProps {
  children: ReactNode
}

export const AccessibleText = forwardRef<Text, AccessibleTextProps>(
  ({children, ...props}, ref) => {
    // This is a workaround for the issue that TalkBack reads numbers as a single number.
    const accessibilityLabel = useMemo(() => {
      if (typeof children === 'string' || typeof children === 'number') {
        const str = String(children)

        return str.replace(/\d{4,}/g, match => match.split('').join(', '))
      }
    }, [children])

    return (
      <Text
        accessibilityLabel={accessibilityLabel}
        accessible
        ref={ref}
        {...props}>
        {children}
      </Text>
    )
  },
)
