# Test Automation

We decided to use [Detox](https://wix.github.io/Detox/).

## TestID's

To be able to interact with app components consistently it is best to assign testID's to the components that we want to interact with.

### Naming convention

We decided to go with this naming convention for components:

`[Module][ComponentType][Which]([SubComponentType][SubComponentWhich])?`

Examples of this are:
`ContactTextInputName` and
`ContactTextInputNameButtonClear`

### Explained per part

#### `[Module]`

The name of the module this component is part of.

Examples:

- `About`
- `Contact`

#### `[ComponentType]`

General type of the component, mainly to describe what kind of interaction can be done.

Examples:

- `Button`
- `Text`
- `Title`
- `TextInput`

Note:
Make them not too specific, `Button` is preferred over `TopTaskButton`.

#### `[Which]`

Describe which component of component type it is on the page.

#### `[SubComponentType]`

Optional. Same type as `ComponentType`, however this is of a subcomponent.
Must be used together with `SubComponentWhich`. See [Subcomponents](#subcomponents).

#### `[SubComponentWhich]`

Optional. Same type as `Which`, however this is of a subcomponent.
Must be used together with `SubComponentWhich`. See [Subcomponents](#subcomponents).

### Subcomponents

Subcomponents are components that are part of a larger interaction component but users should also be able to interact with them individually.

An example of a subcomponent is the 'clear input text cross' inside an input field. It is part of a larger interaction component but you also need to be able to interact with it individually.

### Exceptions

- elements in the `Header`, as they are added automatically to multiple screens, giving them screen specific testID's is hard, therefor they can have `Header` as name of the module
