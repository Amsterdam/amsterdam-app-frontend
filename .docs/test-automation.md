# Test automation

We use [Detox](https://wix.github.io/Detox/) to automatically perform end-to-end regression tests.

To allow the test library to consistently target components, we assign test identifiers to them through a `testID` prop. Most of our components accept this, reused from React Native’s `ViewPort` props.

## Naming convention

A naming convention ensures that these identifiers are in fact unique and makes them easy to use and locate.

We construct the name for a test identifier as follows:

1. Module slug
2. Parent component name (optional)
3. Component identifier (optional)
4. Component type

We use the English language, upper camel case, and concatenate all parts without separators.

Examples: `ConstructionWorkImage`, `HomeWasteGuideModuleButton`, `ContactContactOptionsWhatsappButton`, `ConstructionWorkProject789Image`

### 1. Module slug

This is the human-readable identifier of the module in which the component appears. It matches the slug defined in the modules backend, and the name of the directory used for it in the app’s code repository, but converted to upper camel case.

Examples: `Address`, `ConstructionWork`, `Contact`, `WasteGuide`.

Components in the app’s header use `Header` instead of a module slug, because these components appear in most modules.

### 2. Parent component name

The name of one or more components in the hierarchy between the module and the component. These are generally feature or container components like an overview, a card or a named section of the screen. Try to use the exact component names here to prevent confusion. 

Examples: `ArticleOverview`, `ContactOptions`, `AboutTheApp`.

### 3. Component identifier

This identifies the specific instance of a component type, usually by rephrasing its label or text. One situation in which we use this is to distinguish a couple of related buttons.

Examples:
- A button to edit an address: `…EditAddressButton`
- The title of a city office: `…CityOfficeTitle`

For items in a list, we use their existing identifiers received from the database, or something similar generated in the rendering code, e.g. `ConstructionWorkProject123Title` and `ConstructionWorkProject456Title`.

### 4. Component type

The general type of the component. We’re not too specific here: e.g. a `TopTaskButton` will just be called a `Button`.

Keep close to these options: `Button`, `Input`, `Checkbox`, `Radio`, `Select`, `Title`, `Subtitle`, `Paragraph`, `Date`, `Icon`, and `Image`.

## Generated test identifiers

Some components render child components, and they also may need to be targeted. These components add a suffix to allow matching not only themselves, but their child components as well.

Example: a `TopTaskButton` renders an icon, a title and a text. If such a component is given a `testID="CityOfficeButton"`, it will set it, but also add `CityOfficeButtonTitle` and `CityOfficeButtonText` to the `Title` and `Paragraph` components it renders.

Another example: a search field will either display a ‘submit’ or a ‘clear’ icon button – so an instance with `testID="ConstructionWorkSearchField"` will also render a `ConstructionWorkSearchFieldSubmitButton` or `ConstructionWorkSearchFieldClearButton`.
