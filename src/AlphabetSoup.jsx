// @flow
import * as React from 'react';
import measureText from './helpers/measureText';

const getCharStyle = (
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
type Props = {
  classes: { ['wrapper']: string },
  text: string,
};
type State = {};
class AlphabetSoup extends React.Component<Props, State> {
  render() {
    const {
      classes = {},
      text,
      fontFamily = 'Georgia',
      fontSize = '2em',
      lineHeight = 1.3,
    } = this.props;
    const textWidth = measureText({ text, fontFamily, fontSize, lineHeight })
      .width.value;
    const textCharWidths = text
      .split('')
      .map(
        char =>
          measureText({ text: char, fontFamily, fontSize, lineHeight }).width
            .value,
      );
    return (
      <div
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={classes.wrapper}
      >
        {text.split('').map((char, index) => {
          return (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                ...getCharStyle(index, textWidth, textCharWidths),
              }}
            >
              {char}
            </div>
          );
        })}
      </div>
    );
  }
}

export default AlphabetSoup;
