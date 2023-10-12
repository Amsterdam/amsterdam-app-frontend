# How to define and consume environment variables

## How to define

1. Add the variables with their values to your own `.env` or `.env.local` file and DO NOT PUSH this file.
2. Add the variable names to `.env.example`, so this is a complete list of the existing env vars that can be set. You can add example values or default values so long as they are not secrets (API keys, passwords etc.).
3. Add the variable name and type to `src/custom.d.ts`.
4. Add the variable plus a mock value to `.storybook/mocks/env/index.ts` if necessary. E.g. if the variable is used, either directly or indirectly via an import, in a component that has a story.

## How to consume

There are multiple ways to consume env vars; we use only the import from `@env`, e.g.

```javascript
import {OM_NOM_NOM} from @env
const consume = OM_NOM_NOM
```

And not:

```javascript
const consume = process.env.OM_NOM_NOM
```
