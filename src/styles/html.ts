import {MixedStyleDeclaration} from 'react-native-render-html'
import {color, font} from '../tokens'

const styles: Record<string, MixedStyleDeclaration> = {
  h3: {
    color: color.font.regular,
    fontFamily: font.weight.demi,
    fontSize: font.size.h3,
    lineHeight: font.height.h3,
  },
  list: {
    margin: 0,
    marginLeft: -10,
  },
  listItem: {
    paddingLeft: 10,
  },
  text: {
    color: color.font.regular,
    fontFamily: font.weight.regular,
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
    marginBottom: font.leadingBottom.p1,
    marginTop: font.leadingTop.p1,
  },
}

export const tagsStyles: Record<string, MixedStyleDeclaration> = {
  h3: styles.h3,
  li: {...styles.text, ...styles.listItem},
  p: styles.text,
  ul: styles.list,
}
