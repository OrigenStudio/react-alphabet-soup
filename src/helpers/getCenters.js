// @flow
import { Delaunay } from 'd3-delaunay';
import { polygonCentroid } from 'd3-polygon';
import times from 'lodash/times';
import sortBy from 'lodash/sortBy';
import rejectUndefined from './rejectUndefined';

export type Options = {
  width?: number,
  height?: number,
  maxIterations?: number,
  acceptableError?: number,
  sorting?: 'none' | 'sortByX' | 'sortByY' | 'costFunction',
  costFunctionYWeight?: number,
};

const defaultOptions = {
  width: 100,
  height: 100,
  maxIterations: 20,
  acceptableError: 1e-6,
  sorting: 'none',
  costFunctionYWeight: 1,
};

const getInitialPoints = (
  numberOfPoints: number,
  maxWidth: number,
  maxHeight: number,
) =>
  times(numberOfPoints, () => [
    Math.random() * maxWidth,
    Math.random() * maxHeight,
  ]);

/**
 * This is a function that calculates a set of points evenly distributed in a defined space.
 * It uses the Lloyd's relaxation on a Voronoi diagram to distribute the points.
 * @param {number} numberOfCenters the number of points that need to be distributed in the space.
 * @param {object} [options={}] object with options
 * @param {number} [options.width=100] height of the space
 * @param {number} [options.height=100] height of the space
 * @param {number} [options.maxIterations=20] maximum number of iterations that the Lloyd's relaxation will run through.
 * More iterations mean a more optimal solution, however it can take a lot more time. Less iteration generate less optimal solutions.
 * @param {number} [options.acceptableError=1e-6] error that if achieved between iterations the relaxation process will stop, even if the iterations are not completed.
 * Bigger error with compute results faster.
 * @param {string} [options.sorting='none'] sorting applied to the generated points. 'none' no sorting applied. 'sortByX' sort ascending points using X.
 * 'sortByY' sort ascending points using Y. 'costFunction' sorts points using a cost function like `x + costFunctionYWeight * y`.
 * @param {number} [options.costFunctionYWeight=1] weight applied to Y in the sorting cost function if sorting='costFunction'.
 * @returns {Promise<Array<{x:number, y:number}>>} returns a Promise that when resolved returns an array with the points positions
 */
const getCenters = async (
  numberOfCenters: number,
  options?: Options = defaultOptions,
): Promise<Array<{ x: number, y: number }>> => {
  const {
    width,
    height,
    maxIterations,
    acceptableError,
    sorting,
    costFunctionYWeight,
  } = {
    ...defaultOptions,
    ...rejectUndefined(options),
  };

  let centers = getInitialPoints(numberOfCenters, width, height);
  const error = { X: width, Y: height }; // initialize error with a big number

  // TODO --> Really? A for loop.... these days... OMG
  for (
    let i = 0;
    i < maxIterations &&
    (error.X > acceptableError || error.Y > acceptableError); // A better approach would be to compare the squares of the errors
    i += 1
  ) {
    error.X = 0;
    error.Y = 0;
    const delaunay = Delaunay.from(centers);
    const voronoi = delaunay.voronoi([0, 0, width, height]);
    const cells = times(numberOfCenters, index => voronoi.cellPolygon(index));
    // eslint-disable-next-line no-loop-func
    const newCenters = cells.map((cell, index) => {
      const centroid = polygonCentroid(cell);
      const center = centers[index];
      const deltaX = centroid[0] - center[0];
      const deltaY = centroid[1] - center[1];
      error.X = error.X > Math.abs(deltaX) ? error.X : Math.abs(deltaX);
      error.Y = error.Y > Math.abs(deltaY) ? error.Y : Math.abs(deltaY);
      // error.Y = Math.abs(deltaY);
      const newCenterX = center[0] + deltaX;
      const newCenterY = center[1] + deltaY;
      return [newCenterX, newCenterY];
    });

    centers = newCenters;
  }
  // Organize each point in an object with x and y keys.
  centers = centers.map(value => ({ x: value[0], y: value[1] }));
  switch (sorting) {
    case 'none':
      return centers;
    case 'sortByX':
      return sortBy(centers, ['x']);
    case 'sortByY':
      return sortBy(centers, ['y']);
    case 'costFunction':
      return sortBy(centers, ({ x, y }) => x + costFunctionYWeight * y);

    default:
      return centers;
  }
};

export default getCenters;
