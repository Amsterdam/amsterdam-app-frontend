import {
  ProjectsSearchApiQueryArgs,
  ProjectsSearchQueryArgs,
} from '@/modules/construction-work/types/api'

/**
 * Convert arrays to comma separated strings, for /project/search
 */
export const processSearchQueryArgs = (
  args: ProjectsSearchQueryArgs,
): ProjectsSearchApiQueryArgs => ({
  ...args,
  fields: args.fields.join(','),
  query_fields: args.query_fields.join(','),
})
