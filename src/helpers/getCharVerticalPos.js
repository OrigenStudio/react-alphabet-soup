// @flow
/**
 * This function return the CSS `top` and `left` parameter for the characters of the input index.
 * Currently the makes the text to be centered on the space.
 * @param {number} index index of the characters
 * @param {number} totalHeight total height of the text to render
 * @param {Array<number>} partialHeights array with the width of each character sorted by index position.
 * @returns {left:string} returns the calculated `top` and `left` parameter.
 */
const getCharVerticalPos = (
  index: number,
  totalHeight: number,
  partialHeights: Array<number>,
  partialWidths: Array<number>,
) => {
  const accumulatedWidth = partialHeights.reduce((acc, value, reduceIndex) => {
    if (reduceIndex < index) {
      return acc + value;
    }
    return acc;
  }, 0);
  const relativeLeftPosition = accumulatedWidth - totalHeight / 2;
  return {
    top: `calc(50% + ${relativeLeftPosition}px)`,
    left: `calc(50% - ${partialWidths[index] / 2}px)`,
  };
};

export default getCharVerticalPos;
