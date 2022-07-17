# Modules

De app is opgedeeld in modules, die zo veel mogelijk gescheiden zijn.

## Een nieuwe module toevoegen

De stappen die gedaan moeten worden bij het aanmaken van een nieuwe module zijn:

1. Kopieer en hernoem de map `/src/modules/template` en richt de bestanden in.
2. Voeg de module toe in `/src/modules/index.ts`.
3. Voeg de `Stack`, `RouteName` en `StackParamsList` toe aan `/src/modules/stacks.ts`.
4. Voeg het pictogram toe aan `/src/assets/icons` en de inhoud van `path` aan `IconPath`.
5. Voer de module op in de database via https://api-modules.luscinia-solutions.com/.
