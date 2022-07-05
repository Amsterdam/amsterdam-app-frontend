# Modules

De app is opgedeeld in modules, die zo veel mogelijk gescheiden zijn.

## Stappen om een module toe te voegen

De stappen die gedaan moeten worden bij het aanmaken van een nieuwe module zijn:

1. Kopieer de map `/src/modules/template` en vul deze met de module details
2. Voeg de module toe in `/src/modules/index.ts`
3. Voeg de `Stack`, `RouteName` en `StackParamsList` toe aan `/src/modules/stacks.ts`
4. In het geval van een icoon, voeg deze als svg toe aan de app assets. En voeg deze toe aan `/src/modules/home/config/icons.tsx`
