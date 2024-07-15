import { useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {
  addEventListener,
  disableBlockScreenshot,
  enableBlockScreenshot,
} from 'react-native-block-screenshot';

export default function App() {
  useEffect(() => addEventListener(console.log), []);
  return (
    <View style={styles.container}>
      <Button
        title="enableBlockScreenshot"
        onPress={() =>
          enableBlockScreenshot({
            backgroundColor: '#ec0000',
            scale: 0.33,
            source: require('./logoWhite.png'),
          })
        }
      />
      <Button
        title="disableBlockScreenshot"
        onPress={() => disableBlockScreenshot()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
