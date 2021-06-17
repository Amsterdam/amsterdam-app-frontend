import React from 'react'
import {SafeAreaView} from 'react-native'
import styled from 'styled-components/native'

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState('Useless Text')
  const [number, onChangeNumber] = React.useState('')

  return (
    <SafeAreaView>
      <StyledTextInput onChangeText={onChangeText} value={text} />
      <StyledTextInput
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </SafeAreaView>
  )
}

const StyledTextInput = styled.TextInput`
  height: 40;
  padding: 5;
`

export default UselessTextInput
