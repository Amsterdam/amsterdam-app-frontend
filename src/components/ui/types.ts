import {FC, ReactNode} from 'react'

export type StoryComponent<
  T extends FC<any> | ((props: Record<string, any>) => ReactNode),
> = FC<Parameters<T>[0]> & {
  args?: Partial<Parameters<T>[0]>
}
