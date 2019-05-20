// @flow
import * as React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import AlphabetSoup from './AlphabetSoup';

type Props = {};
const AlphabetSoupWithDimensions = (props: Props) => {
  return (
    <ContainerDimensions>
      {({ width, height }) => (
        <AlphabetSoup width={width} height={height} {...props} />
      )}
    </ContainerDimensions>
  );
};

export default AlphabetSoupWithDimensions;
