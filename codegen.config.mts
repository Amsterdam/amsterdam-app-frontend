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
        spread: 'object',
      },
    ],
  },
]
