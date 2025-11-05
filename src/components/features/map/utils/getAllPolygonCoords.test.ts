import type {FeatureCollection} from 'geojson'
import {getAllPolygonCoords} from '@/components/features/map/utils/getAllPolygonCoords'

describe('getAllPolygonCoords', () => {
  it('should return a flat array of LatLng coordinates consisting of first entry in each feature.geometry.coordinates.', () => {
    const mockGeoJson: FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[1, 2]], [[3, 4]]],
          },
          id: 1,
          properties: {},
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[5, 6]], [[7, 8]]],
          },
          id: 1,
          properties: {},
        },
      ],
    }

    const result = getAllPolygonCoords(mockGeoJson)

    expect(result).toEqual([
      {longitude: 1, latitude: 2},
      {longitude: 5, latitude: 6},
    ])
  })

  it('should return a flat array of LatLng coordinates, filtering out Features other than Polygons.', () => {
    const mockGeoJson: FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[1, 2]], [[3, 4]]],
          },
          id: 1,
          properties: {},
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [5, 6],
          },
          id: 1,
          properties: {},
        },
      ],
    }

    const result = getAllPolygonCoords(mockGeoJson)

    expect(result).toEqual([{longitude: 1, latitude: 2}])
  })
})
