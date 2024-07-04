import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {BarcodeCreatorView, BarcodeFormat} from 'react-native-barcode-creator'

type Props = {
  format: 'QR' | 'CODE128'
  maxHeight: number
  maxWidth: number
  value: string
}

export const BarCode = ({value, format, maxHeight, maxWidth}: Props) => {
  const [width, setWidth] = useState(100)
  const [height, setHeight] = useState(100)

  return (
    <View
      onLayout={e => {
        setWidth(e.nativeEvent.layout.width)
        setHeight(e.nativeEvent.layout.height)
      }}
      style={[
        styles.container,
        {
          maxHeight,
          maxWidth,
        },
      ]}>
      <BarcodeCreatorView
        background={'#FFFFFF'}
        foregroundColor={'#000000'}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        format={format === 'QR' ? BarcodeFormat.QR : BarcodeFormat.CODE128}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore this library is not perfectly typed
        style={[
          {
            height:
              format === 'QR'
                ? Math.min(width, height, maxHeight ?? height)
                : height,
            width:
              format === 'QR'
                ? Math.min(width, height, maxHeight ?? height)
                : width,
          },
          styles.flex,
        ]}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
})
