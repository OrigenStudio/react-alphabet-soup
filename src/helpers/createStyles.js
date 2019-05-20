// @flow
import measureText from './measureText';
import rejectUndefined from './rejectUndefined';
import getCharYPos from './getCharYPos';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_LINE_HEIGHT,
} from '../defaultConstants';

export type Options = {
  fontSize?: string,
  lineHeight?: number,
  fontFamily?: string,
  charCenters?: Array<{ x: number, y: number }>,
};

export const defaultOptions = {
  fontSize: DEFAULT_FONT_SIZE,
  lineHeight: DEFAULT_LINE_HEIGHT,
  fontFamily: DEFAULT_FONT_FAMILY,
  charCenters: undefined,
};
/**
 * Generates the styles for the wrapper and each of the text characters for the animation to happen.
 *
 * @param {string} text text to be rendered. It is used to generate a style for each character.
 * @param {object} [options={}] object with options
 * @param {string} [options.fontSize='20px'] fontSize of the text when the user hovers it.
 * @param {number} [options.lineHeight=1.3] lineHeight of the text when the user hovers it.
 * @param {string} [options.fontFamily='Georgia'] fontFamily of the text.
 * @param {Array<{ x: number, y: number }>} [options.charCenters=undefined] position of the characters before the user hovers them.
 * @returns {{[styleName]: styles}} returns a object with the JSS styles for the wrapper and each character. This object needs to be consumed
 * by the `withStyles` HoC from Material-UI to generate the CSS. The `injectStyles` HoC from JSS can also be used.
 */
const createStyles = (
  text: string,
  options?: Options = defaultOptions,
): Function => (): { [string]: {} } => {
  const { fontSize, lineHeight, fontFamily, charCenters } = {
    ...defaultOptions,
    ...rejectUndefined(options),
  };

  const textAsArray = text.split('');
  const textWidth = measureText(text, { fontFamily, fontSize, lineHeight })
    .width.value;
  const textCharWidths = textAsArray.map(
    char => measureText(char, { fontFamily, fontSize, lineHeight }).width.value,
  );

  const charsHoverStyle = textAsArray.reduce((acc, char, index) => {
    acc[`&:hover $char-${index}`] = {
      top: '50%',
      transform: `rotate(0deg)`,
      fontSize,
      ...getCharYPos(index, textWidth, textCharWidths),
    };
    return acc;
  }, {});

  const charsDefaultStyle = charCenters
    ? textAsArray.reduce((acc, char, index) => {
        acc[`char-${index}`] = {
          position: 'absolute',
          transition: `all ${1 + 0.15 * index}s`,
          left: `${charCenters[index].x}%`,
          top: `${charCenters[index].y}%`,
          fontSize: '50px',
          transform: `rotate(${Math.random() * 90 - Math.random() * 90}deg)`,
        };
        return acc;
      }, {})
    : textAsArray.reduce((acc, char, index) => {
        acc[`char-${index}`] = {
          position: 'absolute',
          transition: `all ${Math.random() + 1}s`,
          top: '50%',
          transform: `rotate(0deg)`,
          fontSize,
          ...getCharYPos(index, textWidth, textCharWidths),
        };
        return acc;
      }, {});

  return {
    wrapper: {
      width: '100%',
      height: '100%',
      position: 'relative',
      ...charsHoverStyle,
    },
    ...charsDefaultStyle,
  };
};

export default createStyles;
