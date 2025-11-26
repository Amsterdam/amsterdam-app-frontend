export const separateMarkersById = <T extends {id: string | number}>(
  filter: Array<string | number> | string | number,
  items: Array<T>,
) =>
  items.reduce(
    (acc: {excluded: Array<T>; included: Array<T>}, marker: T) => {
      if (
        (Array.isArray(filter) && filter.includes(marker.id)) ||
        marker.id === filter
      ) {
        return {
          ...acc,
          excluded: [...acc.excluded, marker],
        }
      }

      return {
        ...acc,
        included: [...acc.included, marker],
      }
    },
    {excluded: [], included: []},
  )
