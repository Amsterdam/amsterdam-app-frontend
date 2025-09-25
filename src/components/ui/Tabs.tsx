import React, {useState, ReactNode, ReactElement} from 'react'
import {StyleSheet, View} from 'react-native'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type TabsProps = {
  children: ReactNode
  grow?: number
  initialTab?: number
} & TestProps

type TabProps = {
  accessibilityLabel?: string
  children: ReactNode
  label: string
}

/**
 * @example <Tabs>
        <Tabs.Tab label="Parkeertijd">
        ...
        </Tabs.Tab>
        <Tabs.Tab label="Parkeerlocatie" accessibilityLabel="Parkeerlocatie kiezen">
        ...
        </Tabs.Tab>
    </Tabs>
 */
export const Tabs = ({
  children,
  grow = 0,
  initialTab = 0,
  testID,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(initialTab)

  const styles = useThemable(createStyles)

  return (
    <Column
      grow={grow}
      halign="stretch">
      <View>
        <Row>
          {React.Children.map(children, (child, index) => {
            if (isChildElementTab(child)) {
              return (
                <PressableBase
                  onPress={() => setActiveTab(index)}
                  style={[styles.tab, activeTab === index && styles.tabActive]}
                  testID={`${testID}Tab${child.props.label}Button`}>
                  <Phrase
                    accessibilityLabel={child.props.accessibilityLabel}
                    color="link"
                    emphasis={activeTab === index ? 'strong' : 'default'}
                    textAlign="center">
                    {child.props.label}
                  </Phrase>
                </PressableBase>
              )
            }

            return null
          })}
        </Row>
      </View>
      {React.Children.toArray(children)[activeTab]}
    </Column>
  )
}

const Tab = ({children}: TabProps) => <>{children}</>

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
