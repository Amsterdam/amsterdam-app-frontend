import type {CodeGenConfig} from 'nodescripts/codegen.mts'

export const config: CodeGenConfig = [
  {
    inputDir: 'src/modules',
    match: 'screenConfig.ts',
    output: 'src/modules/generated/modals.generated.ts',
    imports: [
      {
        import: 'modals',
        exportName: 'modals',
        optional: true,
        result: 'spreadObject',
      },
    ],
  },
  {
    inputDir: 'src/modules',
    match: 'PreRenderComponent.tsx',
    output: 'src/modules/generated/preRenderComponents.generated.ts',
    imports: [
      {
        import: 'PreRenderComponent',
        exportName: 'preRenderComponents',
        optional: true,
        result: (path, name) => `["${path.name}"]: ${name}`,
      },
    ],
  },
]
