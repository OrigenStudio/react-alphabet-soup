// @flow
import measureText from './measureText';
import rejectUndefined from './rejectUndefined';
import getCharYPos from './getCharYPos';
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_TRANSITION_STYLE,
  DEFAULT_TRANSITION_SPEED_MULTIPLIER,
} from '../defaultConstants';

export const TRANSITION_CONSTANT = 'constant';
export const TRANSITION_PROGRESSIVE = 'progressive';
export const TRANSITION_RANDOM = 'random';

export type Options = {
  width?: number,
  height?: number,
  fontSize?: string,
  lineHeight?: number,
  fontFamily?: string,
  transitionStyle?: 'constant' | 'progressive' | 'random',
  transitionSpeedMultiplier?: number,
  charCenters?: Array<{ x: number, y: number }>,
};

export const defaultOptions = {
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  fontSize: DEFAULT_FONT_SIZE,
  lineHeight: DEFAULT_LINE_HEIGHT,
  fontFamily: DEFAULT_FONT_FAMILY,
  transitionStyle: DEFAULT_TRANSITION_STYLE,
  transitionSpeedMultiplier: DEFAULT_TRANSITION_SPEED_MULTIPLIER,
  charCenters: undefined,
};

const generateTransition = (
  type: string,
  speedMultiplier: number,
  index?: number = 0, // required for progressive
): string => {
  switch (type) {
    case TRANSITION_CONSTANT:
      return `all ${1 * speedMultiplier}s`;
    case TRANSITION_PROGRESSIVE:
      return `all ${(1 + 0.15 * index) * speedMultiplier}s`;
    case TRANSITION_RANDOM:
      return `all ${(1 + Math.random()) * speedMultiplier}s`;
    default:
      return 'all 1s';
  }
};

/**
 * Generates the styles for the wrapper and each of the text characters for the animation to happen.
 *
 * @param {string} text text to be rendered. It is used to generate a style for each character.
 * @param {object} [options={}] object with options
 * @param {string} [options.fontSize='20px'] fontSize of the text when the user hovers it.
 * @param {number} [options.lineHeight=1.3] lineHeight of the text when the user hovers it.
 * @param {string} [options.fontFamily='Georgia'] fontFamily of the text.
 * @param {string} [options.transitionStyle='constant'] style of the transition animation. Values: 'constant' | 'progressive' | 'random'.
 * @param {string} [options.transitionSpeedMultiplier=1] speed multiplier for the transition. Default transitions take 1s. The multiplier can increase and decrease that.
 * @param {Array<{ x: number, y: number }>} [options.charCenters=undefined] position of the characters before the user hovers them.
 * @returns {{[styleName]: styles}} returns a object with the JSS styles for the wrapper and each character. This object needs to be consumed
 * by the `withStyles` HoC from Material-UI to generate the CSS. The `injectStyles` HoC from JSS can also be used.
 */
const createStyles = (
  text: string,
  options?: Options = defaultOptions,
): Function => (): { [string]: {} } => {
  const {
    width,
    height,
    fontSize,
    lineHeight,
    fontFamily,
    transitionStyle,
    transitionSpeedMultiplier,
    charCenters,
  } = {
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
          transition: generateTransition(
            transitionStyle,
            transitionSpeedMultiplier,
            index,
          ),
          left: `${(charCenters[index].x / width) * 100}%`,
          top: `${(charCenters[index].y / height) * 100}%`,
          fontSize: '50px',
          transform: `rotate(${Math.random() * 90 - Math.random() * 90}deg)`,
        };
        return acc;
      }, {})
    : textAsArray.reduce((acc, char, index) => {
        acc[`char-${index}`] = {
          position: 'absolute',
          transition: `all 1s`,
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
