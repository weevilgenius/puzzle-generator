/**
 * Temporary local type definitions for martinez-polygon-clipping.
 * These types were removed from exports in v0.8.0.
 * TODO: Remove this file once upstream PR is merged and package updated.
 * @see https://github.com/w8r/martinez/pull/161
 */

/** A coordinate pair [x, y] */
export type Position = [number, number];

/** A polygon: array of rings, where each ring is an array of positions */
export type MartinezPolygon = Position[][];

/** A multi-polygon: array of polygons */
export type MartinezMultiPolygon = Position[][][];

/** Union of polygon types returned by martinez operations */
export type MartinezGeometry = MartinezPolygon | MartinezMultiPolygon;
