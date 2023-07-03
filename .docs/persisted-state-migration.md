# Migrate the persisted Redux state

The scenario: we create a Redux slice for a feature with a state object and we persist (part of) that state when the app is shut down. For example, the state for a settings screen with a dark mode switch, could look like:

```javascript
type State = { darkMode: boolean }
```

We implement our feature based on this state and release it as version *1.0.0*. Then we start work on version *1.1.0* and we realise that we need to change the format of the state for that slice. The dark mode setting may become a three-way choice, which would require a change in the Redux state, like so:

```javascript
type DarkModeOption = 'dark' | 'light' | 'system'
type State = { darkMode: DarkModeOption }
```

Now when a user updates from version *1.0.0* to *1.1.0*, the persisted state might be `{ darkMode: true }`. This cannot be used to rehydrate the new state, since the code expects `darkMode` to be in a different format and their selection is lost.

But worst case, a rehydration with unexpected data may result the app to crash!

## Migration

To solve this, we have to migrate the old state to the new state. Or if this is not possible, at least prevent that the Redux state is rehydrated using an invalid state. For this we use versioning of the Redux states and a migration manifest, which looks like this.

```javascript
type MyStateNegative1 = {
  // this was the first implementation of the state
}

type MyState0 = {
  // this was the second implementation, for version 0
}

export const migrationManifest: MigrationManifest = {
  // added in #.#.#
  0: state => 
    const oldState = state as unknown as MyStateNegative1
    const newState = transformFromOriginalTo0(oldState) // some transformation
    return newState as PersistedState
  },
  // added in #.#.#
  1: state => 
    const oldState = state as unknown as MyState0
    const newState = transformFrom0To1(oldState) // some transformation
    return newState as PersistedState
  },
}
```

Note that:

- The keys of the manifest object match the versions of the state. `-1` being the original, never migrated, state and `0` will be the first migration. In this case, since `1` is the last in the list, we know that `1` is the current version.
- As a result, the output of the last function should match the current type of the state.
- We keep the types for the old states in the same file and name them to match their respective state versions.
- We add a comment with the app version for which we added the migration. We can remove a migration when we know that an app version is no longer used.

Migrations should be unit tested; this is relatively simple as it is usually a transformation from one object format to another.

## Configuring the slices

Every slice has a `ReduxConfig`. The store processes these configurations and handles the persistance automatically. An example config for a slice:

```javascript
{
  key: ReduxKey.myKey,
  migrations: migrationManifest,
  persistVersion: 1,
  slice: mySlice,
}
```

If a new manifest has been created, it has to be added to its respective Redux config. If a manifest already exists, you only have to add a new transform function. Either way, the version in the ReduxConfig for should be incremented to match the key of the newest migration function.
