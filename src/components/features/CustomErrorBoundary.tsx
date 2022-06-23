import React, {Component, ReactNode} from 'react'
import {Pressable, Text, StyleSheet} from 'react-native'
import RNRestart from 'react-native-restart'
import {SafeAreaView} from 'react-native-safe-area-context'
import {devLog} from '@/services'

type Props = {children: ReactNode}

type State = {hasError: boolean}

export class CustomErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error: unknown) {
    devLog(error)
    return {hasError: true}
  }

  render() {
    if (!this.state.hasError === 1) {
      return this.props.children
    }
    const {wrapper, text, paragraph, button, buttonText} = styles
    return (
      <SafeAreaView style={wrapper}>
        <Text style={[paragraph, text]}>
          Er is iets misgegaan met de app. Sorry voor het ongemak!
        </Text>
        <Pressable style={button} onPress={() => RNRestart.Restart()}>
          <Text style={[text, buttonText]}>De app opnieuw opstarten</Text>
        </Pressable>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  text: {
    fontSize: 18,
    lineHeight: 27,
  },
  paragraph: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#004699',
    padding: 12,
  },
  buttonText: {
    color: '#fff',
  },
})
