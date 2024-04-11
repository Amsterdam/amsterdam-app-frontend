import {
  ArticlesQueryArgs,
  ArticlesResponse,
  FollowProjectBody,
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
  ProjectsSearchQueryArgs,
  ProjectsSearchResponse,
} from '@/modules/construction-work/types/api'
import {processSearchQueryArgs} from '@/modules/construction-work/utils/processSearchQueryArgs'
import {tempPostProcessProjectDetails} from '@/modules/construction-work/utils/tempPostProcessProjectDetails'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

const DEFAULT_SEARCH_PAGE_SIZE = 1000
const MODULE_SLUG = ModuleSlug['construction-work']

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // /articles GET
    [ProjectsEndpointName.articles]: builder.query<
      ArticlesResponse,
      ArticlesQueryArgs
    >({
      providesTags: ['Articles'],
      query: params => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({
          path: '/articles',
          params,
        }),
      }),

      keepUnusedDataFor: CacheLifetime.minute,
    }),

    // /project/details GET
    [ProjectsEndpointName.projectDetails]: builder.query<
      ProjectDetailsResponse,
      ProjectDetailsQueryArgs
    >({
      providesTags: ['FollowedProjects', 'Projects'],
      query: params => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({path: '/project/details', params}),
      }),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: tempPostProcessProjectDetails,
    }),

    // /project/news GET
    [ProjectsEndpointName.projectNews]: builder.query<
      ProjectNewsResponse,
      ProjectNewsQueryArgs
    >({
      query: params => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({path: '/project/news', params}),
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),

    // /project/warning GET
    [ProjectsEndpointName.projectWarning]: builder.query<
      ProjectWarningResponse,
      ProjectWarningQueryArgs
    >({
      query: params => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({path: '/project/warning', params}),
      }),
      keepUnusedDataFor: CacheLifetime.week,
    }),

    // /projects GET
    [ProjectsEndpointName.projects]: builder.query<
      ProjectsResponse,
      ProjectsQueryArgs
    >({
      providesTags: ['FollowedProjects', 'Projects'],
      query: params => ({
        slug: MODULE_SLUG,
        url: params
          ? generateRequestUrl({
              path: '/projects',
              params,
            })
          : '/projects',
      }),

      keepUnusedDataFor: CacheLifetime.hour,
    }),

    // /projects/follow DELETE
    [ProjectsEndpointName.projectUnfollow]: builder.mutation<
      string,
      FollowProjectBody
    >({
      invalidatesTags: ['FollowedProjects'],
      query: body => ({
        body,
        method: 'DELETE',
        slug: MODULE_SLUG,
        url: '/projects/follow',
      }),
    }),

    // /projects/follow POST
    [ProjectsEndpointName.projectFollow]: builder.mutation<
      string,
      FollowProjectBody
    >({
      invalidatesTags: ['FollowedProjects'],
      query: body => ({
        body,
        method: 'POST',
        slug: MODULE_SLUG,
        url: '/projects/follow',
      }),
    }),

    // /projects/followed/articles GET
    [ProjectsEndpointName.projectsFollowedArticles]: builder.query<
      ProjectsFollowedArticlesResponse,
      ProjectsFollowedArticlesQueryArgs
    >({
      providesTags: ['Articles', 'FollowedProjects'],
      query: params => ({
        slug: MODULE_SLUG,
        url: params
          ? generateRequestUrl({
              path: '/projects/followed/articles',
              params,
            })
          : '/projects/followed/articles',
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),

    // /projects/search GET
    [ProjectsEndpointName.projectsSearch]: builder.query<
      ProjectsSearchResponse,
      ProjectsSearchQueryArgs
    >({
      providesTags: ['Projects'],
      query: params => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({
          path: '/projects/search',
          params: {
            page_size: DEFAULT_SEARCH_PAGE_SIZE,
            ...processSearchQueryArgs(params),
          },
        }),
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
  }),
  overrideExisting: true,
})

export const {
  useArticlesQuery,
  useProjectDetailsQuery,
  useProjectFollowMutation,
  useProjectNewsQuery,
  useProjectUnfollowMutation,
  useProjectWarningQuery,
  useProjectsFollowedArticlesQuery,
  useProjectsQuery,
  useProjectsSearchQuery,
} = projectsApi
