import { test } from '@diff/websocket';

export  {test };

const MAX_DISTANCE = Number.MAX_SAFE_INTEGER;

export const compose = (...fns: Array<Function>) => (x: any) => fns.reduce((y, f) => f(y), x);
export const cloneDeep = (items: Array<any>) => items.map((item) => (Array.isArray(item) ? cloneDeep(item) : item));
export const applyStaticArgs = (...fns): Function => (...args): Array<Function> => fns.map((fn) => fn.bind(null, ...args));

// Initialize the matrix that shows the steps needed to make each change
type FtomToType = Array<Number | String> | string;

export const createStepsMatrix = (from: FtomToType , to: FtomToType, steps = []) => {
  const stepsLocal = cloneDeep(steps);

  for (let i = 0; i <= from.length; i += 1) {
    stepsLocal[i] = [];

    for (let j = 0; j <= to.length; j += 1) {
      if (i === 0) {
        stepsLocal[i][j] = j;
      } else if (j === 0) {
        stepsLocal[i][j] = i;
      } else stepsLocal[i][j] = 0;
    }
  }

  return stepsLocal;
};

// Build the Levenshtein distance matrix
export const createLevenshteinMatrix = (from, to, steps = []) => {
  let left;
  let diagonal;
  let up;

  const stepsLocal = cloneDeep(steps);

  for (let i = 1; i <= from.length; i += 1) {
    for (let j = 1; j <= to.length; j += 1) {
      left = stepsLocal[i][j - 1];
      diagonal = stepsLocal[i - 1][j - 1];
      up = stepsLocal[i - 1][j];
      if (from[i - 1] === to[j - 1]) {
        // Current characters are same, so inherit from last LCS (which is diagonal)
        stepsLocal[i][j] = diagonal;
      } else {
        // Another difference, so add one to the last optimal LCS
        stepsLocal[i][j] = Math.min(left, diagonal, up) + 1;
      }
    }
  }
  return stepsLocal;
};

const biuldRes = (from, to, steps) => {
  const changes = [];
  let i = from.length;
  let j = to.length;
  let left;
  let diagonal;
  let up;
  let source;
  let char;
  let diff;

  while (i > 0 || j > 0) {
    if (from[i - 1] === to[j - 1]) {
      // No changes from source to destination
      char = from[i - 1];
      diff = '=';
      i -= 1;
      j -= 1;
    } else {
      if (i - 1 < 0) {
        up = MAX_DISTANCE;
      } else {
        up = steps[i - 1][j];
      }
      if (j - 1 < 0) {
        left = MAX_DISTANCE;
      } else {
        left = steps[i][j - 1];
      }
      if (i - 1 < 0 || j - 1 < 0) {
        diagonal = MAX_DISTANCE;
      } else {
        diagonal = steps[i - 1][j - 1];
      }
      source = Math.min(left, up, diagonal);
      if (source === left) {
        // New character from destination
        char = to[j - 1];
        diff = '+';
        j -= 1;
      } else if (source === up) {
        // Removed character from source
        char = from[i - 1];
        diff = '-';
        i -= 1;
      } else if (source === diagonal) {
        // Destination character replace source
        char = from[i - 1];
        diff = {
          replacedBy: to[j - 1],
        };

        i -= 1;
        j -= 1;
      }
    }
    changes.push({ char, diff });
  }
  return changes.reverse();
};

// module.exports.diff = (from, to) => {
//   const functions = applyStaticArgs(createStepsMatrix, createLevenshteinMatrix, biuldRes)(from, to);

//   return compose(...functions)([]);
// };


[
[ 0, 1, 2, 3 ],
[ 1, 0, 0, 0 ],
[ 2, 0, 0, 0 ],
[ 3, 0, 0, 0 ] ]