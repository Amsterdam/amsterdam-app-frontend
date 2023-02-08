# Test Automation

We decided to use [Detox](https://wix.github.io/Detox/).

To allow the test library to consistently interact with components, we assign test identifiers to them through a `testID` prop.

We decided to go with this naming convention for the test identifiers:

`[ModuleName][ComponentType][ComponentName]([SubComponentType][SubComponentName])?`

`[ModuleName][ComponentName]([SubComponentName])?[SubComponentType]`

1. Naam van de module – ‘Contact’
2. Component types tussenliggende niveaus – ‘ContactOptions’
3. Component type van het target – ‘Button’
4. Specifieke tekst: titel, button label – ‘Maak afspraak’ – niet te precies want het precieze label kan aangepast worden, zoek de essentie
5. Identifiers van concepten in lijsten of detailpagina’s – ‘235253253’
6. Subcomponenten – bijv. Input Field en Input Clear Icon, Button Icon en Button Label

Alles in het Engels.

Zonder minnetjes

Contact  ButtonCall

Een knop: `[ModuleName]([ComponentName])+[TargetComponentType]([TargetLabel])`
Bijv. `ContactContactOptionsButtonWhatsapp`

Een project in een lijst: `[ModuleName]([ComponentName])+([ConceptIdentifier])[TargetComponentType]` 
Bijv. `ConstructionWorkProjectCard14Title`

Zoekveld werkzaamheden
`ConstructionWorkSearchFieldInput`, `ConstructionWorkSearchFieldButtonSearch`, `ConstructionWorkSearchFieldButtonClear`

Component types:
- Button
- Input
- Checkbox
- Radio
- Select
- Title
- Subtitle
- Paragraph
- …


ConceptIdentifier alleen in lijsten

Streepjes tussen de onderdelen, maar namen van componenten PascalCase houden (bijv. ArticleOverview)

Examples:
- `ContactTextInputName` 
- `ContactTextInputNameButtonClear`

## Module key

The name of the module in which the component appears.

Examples:

- `About`
- `Contact`
- `WasteGuide`

### Exceptions

We replace the module key with `Header` for components in the app header, as these components are displayed on screens for various modules.

## Component type

The general type of the component. This indicates the kinds of interaction that can occur.

Examples:

- `Button`
- `Text`
- `TextInput`

Don’t make these too specific: instead of `TopTaskButton`, we just use `Button`.

## Component key

Identifies the specific instance of a component type.

Examples:
- A button to edit an address: `[Module]ButtonEditAddress`
- The title of a city office: `[Module]TitleCityOffice`

## Subcomponent type

Optional.
Same type as `ComponentType`.
Use together with `SubComponentName`.

Subcomponents are components that are part of a larger interaction component, with which users must be able to interact individually.

Example: the ‘cross’ icon in an input field must be pressed to clear its value, separately from the input field itself.

## Subcomponent key

Optional.
Same type as `ComponentName`.
Use together with `SubComponentType`.

Example:
- [Module]TextInputAddressButtonClear
