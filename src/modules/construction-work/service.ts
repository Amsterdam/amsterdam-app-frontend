import {
  ArticlesQueryArgs,
  ArticlesResponse,
  FollowProjectBody,
  ProjectDetail,
  ProjectDetailsQueryArgs,
  ProjectDetailsResponse,
  ProjectNewsQueryArgs,
  ProjectNewsResponse,
  ProjectWarningQueryArgs,
  ProjectWarningResponse,
  ProjectsEndpointName,
  ProjectsFollowedArticlesQueryArgs,
  ProjectsFollowedArticlesResponse,
  ProjectsQueryArgs,
  ProjectsResponse,
  ProjectsSearchApiQueryArgs,
  ProjectsSearchQueryArgs,
  ProjectsSearchResponse,
} from '@/modules/construction-work/types/api'
import {baseApi} from '@/services/init'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

const DEFAULT_SEARCH_PAGE_SIZE = 1000

/**
 * Convert arrays to comma separated strings
 */
const processSearchQueryArgs = (
  args: ProjectsSearchQueryArgs,
): ProjectsSearchApiQueryArgs => ({
  ...args,
  fields: args.fields.join(','),
  query_fields: args.query_fields.join(','),
})

/**
 * Temporarily add `progress` to timeline items. This can be removed when IPROX and our API return this property again.
 */
const postProcessProjectDetails = (item: ProjectDetail): ProjectDetail => {
  if (!item.timeline) {
    return item
  }

  return {
    ...item,
    timeline: {
      ...item.timeline,
      items:
        item.timeline.items?.map(subItem => ({
          ...subItem,
          progress: 'Huidig',
        })) ?? null,
    },
  }
}

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // /articles GET
    [ProjectsEndpointName.articles]: builder.query<
      ArticlesResponse,
      ArticlesQueryArgs
    >({
      providesTags: ['Articles'],
      query: params =>
        generateRequestUrl({
          path: '/articles',
          params,
        }),
      keepUnusedDataFor: CacheLifetime.minute,
    }),

    // /project/details GET
    [ProjectsEndpointName.projectDetails]: builder.query<
      ProjectDetailsResponse,
      ProjectDetailsQueryArgs
    >({
      providesTags: ['FollowedProjects', 'Projects'],
      query: params => generateRequestUrl({path: '/project/details', params}),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: postProcessProjectDetails,
    }),

    // /project/news GET
    [ProjectsEndpointName.projectNews]: builder.query<
      ProjectNewsResponse,
      ProjectNewsQueryArgs
    >({
      query: params => generateRequestUrl({path: '/project/news', params}),
      keepUnusedDataFor: CacheLifetime.hour,
    }),

    // /project/warning GET
    [ProjectsEndpointName.projectWarning]: builder.query<
      ProjectWarningResponse,
      ProjectWarningQueryArgs
    >({
      query: params => generateRequestUrl({path: '/project/warning', params}),
      keepUnusedDataFor: CacheLifetime.week,
    }),

    // /projects GET
    [ProjectsEndpointName.projects]: builder.query<
      ProjectsResponse,
      ProjectsQueryArgs
    >({
      providesTags: ['FollowedProjects', 'Projects'],
      query: params => {
        const path = '/projects'

        if (!params) {
          return path
        }

        return generateRequestUrl({
          path: '/projects',
          params,
        })
      },

      keepUnusedDataFor: CacheLifetime.hour,
    }),

    // /projects/follow DELETE
    [ProjectsEndpointName.projectsFollowDelete]: builder.mutation<
      string,
      FollowProjectBody
    >({
      invalidatesTags: ['FollowedProjects'],
      query: body => ({
        url: '/projects/follow',
        method: 'DELETE',
        body,
      }),
    }),

    // /projects/follow POST
    [ProjectsEndpointName.projectsFollowPost]: builder.mutation<
      string,
      FollowProjectBody
    >({
      invalidatesTags: ['FollowedProjects'],
      query: body => ({
        url: '/projects/follow',
        method: 'POST',
        body,
      }),
    }),

    // /projects/followed/articles GET
    [ProjectsEndpointName.projectsFollowedArticles]: builder.query<
      ProjectsFollowedArticlesResponse,
      ProjectsFollowedArticlesQueryArgs
    >({
      providesTags: ['Articles', 'FollowedProjects'],
      query: params => {
        const path = '/projects/followed/articles'

        if (!params) {
          return path
        }

        return generateRequestUrl({
          path,
          params,
        })
      },
      keepUnusedDataFor: CacheLifetime.hour,
    }),

    // /projects/search GET
    [ProjectsEndpointName.projectsSearch]: builder.query<
      ProjectsSearchResponse,
      ProjectsSearchQueryArgs
    >({
      providesTags: ['Projects'],
      query: params =>
        generateRequestUrl({
          path: '/projects/search',
          params: {
            page_size: DEFAULT_SEARCH_PAGE_SIZE,
            ...processSearchQueryArgs(params),
          },
        }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
  }),
  overrideExisting: true,
})

export const {
  useArticlesQuery,
  useProjectDetailsQuery,
  useProjectNewsQuery,
  useProjectWarningQuery,
  useProjectsFollowDeleteMutation,
  useProjectsFollowedArticlesQuery,
  useProjectsFollowPostMutation,
  useProjectsQuery,
  useProjectsSearchQuery,
} = projectsApi
