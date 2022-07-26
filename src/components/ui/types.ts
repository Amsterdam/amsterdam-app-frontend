import {FC, ReactNode} from 'react'

export type StoryComponent<
  T extends FC<unknown> | ((props: Record<string, unknown>) => ReactNode),
> = FC<Parameters<T>[0]> & {
  args?: Partial<Parameters<T>[0]>
}
