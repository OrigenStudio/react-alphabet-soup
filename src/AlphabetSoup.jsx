// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import withPropsOnChange from 'recompose/withPropsOnChange';
import lifeCycle from 'recompose/lifecycle';
import componentFromProp from 'recompose/componentFromProp';
import withStyles from '@material-ui/core/styles/withStyles';
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
};
type State = {};
class AlphabetSoup extends React.Component<Props, State> {
  defaultProps = {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: DEFAULT_FONT_SIZE,
    lineHeight: DEFAULT_LINE_HEIGHT,
  };

  render() {
    const { classes = {}, text } = this.props;

    // console.log('====================================');
    // console.log('Render', this.props);
    // console.log('====================================');

    return (
      <div
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={classes.wrapper}
      >
        {text.split('').map((char, index) => {
          return (
            <div className={classes[`char-${index}`]} key={`${char}-${index}`}>
              {char}
            </div>
          );
        })}
      </div>
    );
  }
}

const enhancer: HOC<
  Props,
  {
    ...getCentersArguments,
    text: string,
    fontSize?: string,
    fontFamily?: string,
    lineHeight?: number,
  },
> = compose(
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
