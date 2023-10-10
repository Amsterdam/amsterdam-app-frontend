# Storybook

We use React Native Web to render the native components in the Storybook web interface. The Storybook build is published to a GitHub Pages site after each push to the main branch.

## Configuration

See the folder `.storybook`, which contains:

- `components` - Helper components for stories.
- `mocks` - Mocked versions of packages that do not work in a web context, either because they offer no RNW support or because they offer functionality that is purely native (see below).
- `utils` - Various functions and definitions that can be shared between multiple stories.
- `main.ts` - The main config file.
- `preview.css` - Fonts and shared styling for stories.
- `preview.tsx` - Shared config for the stories, including:
  - *decorators*: wrappers for the story components, in this case to make the navigation and redux state available;
  - *actions*: handle user input events;
  - *backgrounds*: define the available background colors;
  - *controls*: configure controls, e.g. map the name of a prop to a contol type;
  - *viewport*: define available viewport sizes and the default.

## Storybook + Vite

Theoretically Storybook will support React Native Web via an addon, however at the time of wariting (Oct 2023) it does not seem to work with Vite: https://storybook.js.org/addons/@storybook/addon-react-native-web

## Mocks

These mocked packages are referenced in the alias config in `main.ts`:

- `env` - Mock the @env package which exposes environment vars.
- `fast-image` - Replace the `react-native-fast-image` (cached images) with the default RN Image component.
- `image-crop-picker` - Replace the native image pick/resize functionality with something that does nothing.
- `notifee` - Replace the push notifications with something that does nothing.
- `sentry` - Replace Sentry error logging with something that does nothing.

## Required dev dependencies

- `@storybook/addon-a11y` - A11y Storybook tools.
- `@storybook/addon-essentials` - The basic Storybook controls etc.
- `@storybook/react-vite` - The Vite-built version of Storybook.
- `@types/react-dom` - Required for React Native Web.
- `@vitejs/plugin-react` - Allows Vite to handle ReactJS.
- `eslint-plugin-storybook` - Linting.
- `lodash/merge` - Helper to merge the Vite config objects, to replace Vite's `mergeConfig` function.
- `path` - Helper to resolve various folders in the Storybook `main.ts` config.
- `react-docgen-typescript-plugin` - Generates Storybook controls from props and other code patterns.
- `react-dom` - Required for React Native Web.
- `react-native-svg-web` - `react-native-svg` should support web, but doesn't.
- `react-native-web` - React Native Web itself.
- `storybook` - Storybook itself.
- `vite-plugin-commonjs` - Vite needs this to support `require` statements.
- `vite-plugin-svgr` - Render raw SVG files.