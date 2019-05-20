// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import withPropsOnChange from 'recompose/withPropsOnChange';
import lifeCycle from 'recompose/lifecycle';
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
type State = {};

/**
 * This component renders and animates the text as an Alphabet Soup
 * @param {string} text text to render
 * @param {number} [width=100] width of the space in pixels
 * @param {number} [height=100] height of the space in pixels
 * @param {string} [fontSize='20px'] fontSize of the text when the user hovers it.
 * @param {number} [lineHeight=1.3] lineHeight of the text when the user hovers it.
 * @param {string} [fontFamily='Georgia'] fontFamily of the text.
 * @param {string} [transitionStyle='constant'] style of the transition animation. Values: 'constant' | 'progressive' | 'random'.
 * @param {string} [transitionSpeedMultiplier=1] speed multiplier for the transition. Default transitions take 1s. The multiplier can increase and decrease that.
 * @param {number} [maxIterations=20] maximum number of iterations that the Lloyd's relaxation will run through.
 * More iterations mean a more optimal solution, however it can take a lot more time. Less iteration generate less optimal solutions.
 * @param {number} [acceptableError=1e-6] error that if achieved between iterations the relaxation process will stop, even if the iterations are not completed.
 * Bigger error with compute results faster.
 * @param {string} [sorting='none'] sorting applied to the generated points. 'none' no sorting applied. 'sortByX' sort ascending points using X.
 * 'sortByY' sort ascending points using Y. 'costFunction' sorts points using a cost function like `x + costFunctionYWeight * y`.
 * @param {number} [costFunctionYWeight=1] weight applied to Y in the sorting cost function if sorting='costFunction'.
 * @param {string} [wrapperClassName=''] class name of the wrapper component.
 * @param {string} [charactersClassName=''] class name of the characters. It will be applied to all the characters.

 * @returns renders the React component
 */
class AlphabetSoup extends React.Component<Props, State> {
  defaultProps = {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: DEFAULT_FONT_SIZE,
    lineHeight: DEFAULT_LINE_HEIGHT,
    wrapperClassName: undefined,
    charactersClassName: undefined,
  };

  render() {
    const {
      classes = {},
      text,
      wrapperClassName,
      charactersClassName,
    } = this.props;

    // console.log('====================================');
    // console.log('Render', this.props);
    // console.log('====================================');

    return (
      <div
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={classNames(
          classes.wrapper,
          wrapperClassName ? [wrapperClassName] : null,
        )}
      >
        {text.split('').map((char, index) => {
          return (
            <div
              className={classNames(
                classes[`char-${index}`],
                charactersClassName ? [charactersClassName] : null,
              )}
              key={`${char}-${index}`}
            >
              {char}
            </div>
          );
        })}
      </div>
    );
  }
}

export type EnhancedProps = {
  ...getCentersArguments,
  text: string,
  fontSize?: string,
  fontFamily?: string,
  lineHeight?: number,
  transitionStyle?: 'constant' | 'progressive' | 'random',
  transitionSpeedMultiplier?: number,
};

const enhancer: HOC<Props, EnhancedProps> = compose(
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
      charCenters,
    }) => {
      // console.log('====================================');
      // console.log('charCenters', charCenters);
      // console.log('====================================');
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
            charCenters,
          }),
        )(AlphabetSoup),
      };
    },
  ),
);

export default enhancer(componentFromProp('component'));
