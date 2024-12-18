import {useFocusEffect} from '@react-navigation/core'
import {useCallback} from 'react'
import {View} from 'react-native'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {AccessCodeKeyBoard} from '@/modules/access-code/components/AccessCodeKeyBoard'
import {SetAccessCode} from '@/modules/access-code/components/SetAccessCode'
import {useSetAccessCode} from '@/modules/access-code/hooks/useSetAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeType} from '@/modules/access-code/types'

type Props = NavigationProps<AccessCodeRouteName.setAccessCode>

export const SetAccessCodeScreen = ({navigation: {navigate}}: Props) => {
  const {isCodeSet} = useSetAccessCode()

  useFocusEffect(
    useCallback(() => {
      if (isCodeSet) {
        navigate(AccessCodeRouteName.confirmAccessCode)
      }
    }, [isCodeSet, navigate]),
  )

  return (
    <Screen
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
              testID="SetAccessCodeScreenList"
            />
          </View>
        </Column>
      </Box>
    </Screen>
  )
}
