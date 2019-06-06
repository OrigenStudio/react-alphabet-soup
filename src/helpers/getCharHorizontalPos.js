// @flow
/**
 * This function return the CSS `left` parameter for the characters of the input index.
 * Currently the makes the text to be centered on the space.
 * @param {number} index index of the characters to calculate the CSS `left` parameter
 * @param {number} totalWidth total width of the text to render
 * @param {Array<number>} partialWidths array with the width of each character sorted by index position.
 * @returns {left:string} returns the calculated `left` parameter.
 */
const getCharHorizontalPos = (
  index: number,
  totalWidth: number,
  partialWidths: Array<number>,
) => {
  const accumulatedWidth = partialWidths.reduce((acc, value, reduceIndex) => {
    if (reduceIndex < index) {
      return acc + value;
    }
    return acc;
  }, 0);
  const relativeLeftPosition = accumulatedWidth - totalWidth / 2;
  return {
    left: `calc(50% + ${relativeLeftPosition}px)`,
  };
};

export default getCharHorizontalPos;
