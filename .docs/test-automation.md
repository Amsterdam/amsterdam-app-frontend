# Test Automation

We decided to use [Detox](https://wix.github.io/Detox/).

To allow the test library to consistently interact with components, we assign test identifiers to them through a `testID` prop.

We decided to go with this naming convention for the test identifiers:

`[ModuleKey][ComponentType][ComponentKey]([SubComponentType][SubComponentKey])?`

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
Use together with `SubComponentKey`.

Subcomponents are components that are part of a larger interaction component, with which users must be able to interact individually.

Example: the ‘cross’ icon in an input field must be pressed to clear its value, separately from the input field itself.

## Subcomponent key

Optional.
Same type as `ComponentKey`.
Use together with `SubComponentType`.

Example:
- [Module]TextInputAddressButtonClear
