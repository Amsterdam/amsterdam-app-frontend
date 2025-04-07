import React, {useState, ReactNode, ReactElement} from 'react'
import {StyleSheet, View} from 'react-native'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

interface TabsProps {
  children: ReactNode
}

interface TabProps {
  children: ReactNode
  label: string
}

export const Tabs = ({children}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const styles = useThemable(createStyles)

  return (
    <Column
      //   grow={1}
      halign="stretch">
      <View>
        <Row>
          {React.Children.map(children, (child, index) => {
            if (isChildElementTab(child)) {
              return (
                <PressableBase
                  onPress={() => setActiveTab(index)}
                  style={[styles.tab, activeTab === index && styles.tabActive]}
                  testID="123">
                  <Phrase textAlign="center">{child.props.label}</Phrase>
                </PressableBase>
              )
            }

            return null
          })}
        </Row>
      </View>
      {/* <div style={{padding: '20px'}}> */}
      {React.Children.toArray(children)[activeTab]}
      {/* </div> */}
    </Column>
  )
}

export const Tab = ({children}: TabProps) => <>{children}</>

Tabs.Tab = Tab

const isChildElementTab = (child: ReactNode): child is ReactElement<TabProps> =>
  React.isValidElement(child) && child.type === Tab

const createStyles = ({color, size, border}: Theme) =>
  StyleSheet.create({
    tab: {
      paddingHorizontal: size.spacing.lg,
      flex: 1,
      paddingTop: size.spacing.sm,
      paddingBottom: size.spacing.sm - border.width.sm,
      borderBottomWidth: border.width.sm,
      borderBottomColor: color.tabs.tab.inactive.border,
    },
    tabActive: {
      paddingBottom: size.spacing.sm - border.width.xl,
      borderBottomWidth: border.width.xl,
      borderBottomColor: color.tabs.tab.active.border,
    },
  })
