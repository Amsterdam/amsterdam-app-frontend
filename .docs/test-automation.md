# Test automation

We use [Detox](https://wix.github.io/Detox/) to automatically perform end-to-end regression tests.

To allow the test library to consistently target components, we assign test identifiers to them through a `testID` prop. Most of our components accept this, reused from React Native’s `ViewPort` props.

## Naming convention

A naming convention ensures that these identifiers are in fact unique and makes them easy to use and locate. We use the English language, upper camel case, and concatenate all parts without separators.

### Regular components

For regular components, we construct a test identifier as follows:

1. `[ModuleSlug]`
2. `([ParentComponentName])` (one or more)
3. `([ComponentLabel])` (zero or one)
4. `[ComponentType]`

Examples: `ConstructionWorkImage`, `HomeWasteGuideModuleButton`, `ContactContactOptionsWhatsappButton`.

### Components in a list

For items in a list, we include a unique identifier for the item itself, either its id in the database or something generated in the rendering code:

1. `[ModuleSlug]`
2. `([ParentComponentName])` (one or more)
3. `[ComponentIdentifier]`
4. `[ComponentType]` (zero or one)

Example: `ConstructionWorkProjectCard2345Title`.

## Module slug

This is the human-readable identifier of the module in which the component appears. This matches the slug defined in the modules backend, and the name of the directory used for it in the app’s code repository, but converted to upper camel case.

Examples: `Address`, `ConstructionWork`, `Contact`, `WasteGuide`.

Components in the app’s header use `Header` instead of a module slug, because these components appear in most modules.

## Parent component name

The name of one or more components in the hierarchy between the module and the component. These are generally feature or container components like an overview, a card or a named section of the screen. Try to use the exact component names here to prevent confusion. 

Examples: `ArticleOverview`, `ContactOptions`, `ProjectCard`.

## Component identifier

In overviews or lists, we allow distinguishing between the individual items by adding their database identifier, e.g. `ConstructionWorkProjectCard1234` and `ConstructionWorkProjectCard567Date`.

## Component label

This identifies the specific instance of a component type, usually by rephrasing its label or text. One situation in which we use this is to distinguish a couple of related buttons.

Examples:
- A button to edit an address: `…EditAddressButton`
- The title of a city office: `…CityOfficeTitle`

## Component type

The general type of the component. We’re not too specific here: e.g. a `TopTaskButton` will just be called a `Button`.

Keep close to these options: `Button`, `Input`, `Checkbox`, `Radio`, `Select`, `Title`, `Subtitle`, `Paragraph`, `Date`, `Icon`, and `Image`.

## Generated test identifiers

Some components render child components, and they also may need to be targeted. These components add a suffix to allow matching not only themselves, but their child components as well.

Example: a `TopTaskButton` renders an icon, a title and a text. If such a component is given a `testID="CityOfficeButton"`, it will set it, but also add `CityOfficeButtonTitle` and `CityOfficeButtonText` to the `Title` and `Paragraph` components it renders.

Another example: a search field will either display a ‘search’ or a ‘clear’ icon button – so a field with `testID="ConstructionWorkSearchFieldInput"` will also render a `ConstructionWorkSearchFieldInputSearchButton` or `ConstructionWorkSearchFieldInputClearButton`.

