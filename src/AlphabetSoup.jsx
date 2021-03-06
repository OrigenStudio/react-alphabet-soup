// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import withPropsOnChange from 'recompose/withPropsOnChange';
import lifeCycle from 'recompose/lifecycle';
import branch from 'recompose/branch';
import componentFromProp from 'recompose/componentFromProp';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import type { HOC } from 'recompose';
import getCenters from './helpers/getCenters';
import createStyles from './helpers/createStyles';
import type { Options as getCentersArguments } from './helpers/getCenters';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
} from './defaultConstants';

type Props = {
  classes: { [string]: string },
  text: string,
  fontFamily?: string,
  fontSize?: string,
  lineHeight?: number,
  wrapperClassName?: string,
  charactersClassName?: string,
};

/**
 * This component renders and animates the text as an Alphabet Soup
 * @param {string} text text to render
 * @param {number} [width=100] width of the space in pixels
 * @param {number} [height=100] height of the space in pixels
 * @param {string} [fontSize='20px'] fontSize of the text when tidy.
 * @param {number} [lineHeight=1.3] lineHeight of the text when tidy.
 * @param {string} [fontFamily='Georgia'] fontFamily of the text.
 * @param {string} [transitionStyle='constant'] style of the transition animation. Values: 'constant' | 'progressive' | 'random'.
 * @param {string} [transitionSpeedMultiplier=1] speed multiplier for the transition. Default transitions take 1s. The multiplier can increase and decrease that.
 * @param {string} [transitionTimingFunction='ease'] is the transition timing function used on CSS transition. e.g. ease, ease-in, cubic-bezier(1, 0.24, 0.25, 1), ...
 * @param {number} [maxIterations=20] maximum number of iterations that the Lloyd's relaxation will run through.
 * More iterations mean a more optimal solution, however it can take a lot more time. Less iteration generate less optimal solutions.
 * @param {number} [acceptableError=1e-6] error that if achieved between iterations the relaxation process will stop, even if the iterations are not completed.
 * Bigger error with compute results faster.
 * @param {string} [sorting='none'] sorting applied to the generated points. 'none' no sorting applied. 'sortByX' sort ascending points using X.
 * 'sortByY' sort ascending points using Y. 'costFunction' sorts points using a cost function like `x + costFunctionYWeight * y`.
 * @param {number} [costFunctionYWeight=1] weight applied to Y in the sorting cost function if sorting='costFunction'.
 * @param {string} [wrapperClassName=''] class name of the wrapper component.
 * @param {string} [charactersClassName=''] class name of the characters. It will be applied to all the characters.
 * @param {boolean} [untidyOnHover=false] reverses the behaviour. The text is tidy by default and gets untidy when hover
 * @param {boolean} [vertical=false] when true, the tidied text renders in vertical.

 * @returns renders the React component
 */

const AlphabetSoup = (props: Props) => {
  const { classes = {}, text, wrapperClassName, charactersClassName } = props;
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      className={classNames(
        wrapperClassName ? [wrapperClassName] : null,
        classes.wrapper,
      )}
    >
      {text.split('').map((char, index) => {
        return (
          <div
            className={classNames(
              charactersClassName ? [charactersClassName] : null,
              classes[`char-${index}`],
            )}
            key={`${char}-${index}`}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
};
AlphabetSoup.defaultProps = {
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAULT_FONT_SIZE,
  lineHeight: DEFAULT_LINE_HEIGHT,
  wrapperClassName: undefined,
  charactersClassName: undefined,
};
export type EnhancedProps = {
  ...getCentersArguments,
  text: string,
  fontSize?: string,
  fontFamily?: string,
  lineHeight?: number,
  transitionStyle?: 'constant' | 'progressive' | 'random',
  transitionSpeedMultiplier?: number,
  transitionTimingFunction?: string,
  untidyOnHover?: boolean,
  vertical?: boolean,
};

const enhancer: HOC<Props, EnhancedProps> = compose(
  branch(
    () => {
      return typeof document === 'undefined';
    },
    () => () => <div />,
  ),
  withPropsOnChange(['width', 'height'], ({ width, height }) => {
    // If width or height are 0 or negative the function will fallback to calculate the points for a 100x100 space
    if (width <= 0 || height <= 0) {
      width = DEFAULT_WIDTH;
      height = DEFAULT_HEIGHT;
    }
    return { width, height };
  }),
  lifeCycle({
    componentDidMount() {
      const {
        text,
        width,
        height,
        maxIterations,
        acceptableError,
        sorting,
        costFunctionYWeight,
      } = this.props;
      getCenters(text.length, {
        width,
        height,
        maxIterations,
        acceptableError,
        sorting,
        costFunctionYWeight,
      }).then(result => {
        this.setState({ charCenters: result });
      });
    },
  }),
  withPropsOnChange(
    ['text', 'charCenters'],
    ({
      text,
      width,
      height,
      fontSize,
      lineHeight,
      fontFamily,
      transitionStyle,
      transitionSpeedMultiplier,
      transitionTimingFunction,
      charCenters,
      untidyOnHover,
      vertical,
    }) => {
      return {
        component: withStyles(
          createStyles(text, {
            width,
            height,
            fontSize,
            lineHeight,
            fontFamily,
            transitionStyle,
            transitionSpeedMultiplier,
            transitionTimingFunction,
            charCenters,
            untidyOnHover,
            vertical,
          }),
        )(AlphabetSoup),
      };
    },
  ),
);

export default enhancer(componentFromProp('component'));
