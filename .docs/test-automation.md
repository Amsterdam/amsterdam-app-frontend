# Test automation

We use [Detox](https://wix.github.io/Detox/) to automatically test end-to-end regression tests.

To allow the test library to consistently target components, we assign test identifiers to them through a `testID` prop. Most of our components accept this, reused from React Native’s `ViewPort` props.

## Naming convention

A naming convention ensures that these identifiers are in fact unique and makes them easy to use and locate. We use the English language, upper camel case, and concatenate all parts without separators.

### Regular target components

For regular target components, we construct a test identifier as follows:

1. `[ModuleSlug]`
2. `([ComponentName])` (one or more)
3. `[TargetComponentType]`
4. `([TargetComponentLabel])` (zero or one)

Examples: `ConstructionWorkImage`, `HomeModuleButtonWasteGuide`, `ContactContactOptionsButtonWhatsapp`.

### Target components in a list

For items in a list, we include the item’s unique database identifier:

1. `[ModuleSlug]`
2. `([ComponentName])` (one or more)
3. `[ItemIdentifier]`
4. `[TargetComponentType]` (zero or one)

Example: `ConstructionWorkProjectCard2345Title`.

## Module slug

This is the human-readable identifier of the module in which the target component appears. This matches the slug defined in the modules backend, and the name of the directory used for it in the app’s code repository, but converted to upper camel case.

Examples: `Address`, `ConstructionWork`, `Contact`, `WasteGuide`.

Components in the app’s header use `Header` instead of a module slug, because these components appear in most modules.

## Component name

The name of one or more components in the hierarchy between the module and the target component. These are generally feature or container components like an overview, a card or a named section of the screen. Try to use the exact component names here to prevent confusion. 

Examples: `ArticleOverview`, `ContactOptions`, `ProjectCard`.

## Item identifier

In overviews or lists, we alle distinguisihing between the individual items by adding their database identifier, e.g.  `ConstructionWorkProjectCard1234` and `ConstructionWorkProjectCard567Date`.

## Target component type

The general type of the target component. We’re not too specific here: a `Pressable` or a `TopTaskButton` will just be called a `Button`. 

Keep close to these options: `Button`, `Input`, `Checkbox`, `Radio`, `Select`, `Title`, `Subtitle`, `Paragraph`, `Date`, `Icon`, and `Image`.

## Target component label

This identifies the specific instance of a component type, usually by rephrasing its label or text. One situation in which we use this is to distinguish a couple of related buttons.

Examples:
- A button to edit an address: `…ButtonEditAddress`
- The title of a city office: `…TitleCityOffice`

## Automatic subcomponent suffixes

Components that render subcomponents themselves may add these component types to the end of their test identifier.

Example: a `TopTaskButton` renders a title and a text, resulting in test identifiers like `CityOfficeButton`, `CityOfficeButtonTitle`, and `CityOfficeButtonText`.

Another example: a search field with search and clear buttons inside may have test identifiers like `ConstructionWorkSearchFieldInput`, `ConstructionWorkSearchFieldButtonSearch`, and `ConstructionWorkSearchFieldButtonClear`.

