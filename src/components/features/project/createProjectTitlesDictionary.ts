import {ProjectTitles} from '../../../types'

type Type = (projects?: ProjectTitles[]) => Record<string, string>

/**
 * Joins title and subtitle with a comma, with the subtitle’s first letter lowercased.
 * @param projects
 */
export const createProjectTitlesDictionary: Type = projects => {
  if (!projects?.length) {
    return {}
  }

  return projects.reduce((acc, {identifier, title, subtitle}) => {
    if (!subtitle) {
      return {...acc, [identifier]: title}
    }

    const lowerCasedSubtitle =
      subtitle.charAt(0).toLowerCase() + subtitle.substring(1)

    return {
      ...acc,
      [identifier]: [title, lowerCasedSubtitle].join(', '),
    }
  }, {})
}
