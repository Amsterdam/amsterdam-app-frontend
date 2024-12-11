import {useEffect} from 'react'
import {View} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AccessCodeKeyBoard} from '@/modules/access-code/components/AccessCodeKeyBoard'
import {AccessCodeValidationBoundaryScreen} from '@/modules/access-code/components/AccessCodeValidationBoundaryScreen'
import {SetAccessCode} from '@/modules/access-code/components/SetAccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeType} from '@/modules/access-code/types'

export const SetAccessCodeScreen = () => {
  const navigation = useNavigation()
  const {isCodeSet, setIsCodeConfirmed, setIsCodeSet, resetError, setCode} =
    useAccessCode()

  useEffect(() => {
    resetError()
    setIsCodeSet(false)
    setIsCodeConfirmed(false)
    setCode({code: [], type: AccessCodeType.codeSet})
  }, [resetError, setCode, setIsCodeConfirmed, setIsCodeSet])

  useEffect(() => {
    if (isCodeSet) {
      navigation.navigate(AccessCodeRouteName.confirmAccessCode)
    }
  }, [isCodeSet, navigation])

  return (
    <AccessCodeValidationBoundaryScreen
      stickyFooter={<AccessCodeKeyBoard type={AccessCodeType.codeSet} />}
      testID="SetAccessCodeScreen"
      withBottomInset={false}>
      <Box grow>
        <Column
          align="center"
          grow={1}
          gutter="lg">
          <Title
            level="h2"
            testID="SetAccessCodeScreenTitle"
            text="Kies een toegangscode"
          />
          <SetAccessCode />
          <View
            accessibilityLabel="Uw toegangscode mag niet bestaan uit 5 dezelfde cijfers of Opeenvolgende cijfers, zoals 12345 of 87654"
            accessibilityLanguage="nl-NL"
            accessible
            testID="SetAccessCodeScreenText">
            <Paragraph>Uw toegangscode mag niet bestaan uit:</Paragraph>
            <List
              items={[
                '5 dezelfde cijfers',
                'Opeenvolgende cijfers, zoals 12345 of 87654',
              ]}
              testID=""
            />
          </View>
        </Column>
      </Box>
    </AccessCodeValidationBoundaryScreen>
  )
}
