// @flow
import * as React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import AlphabetSoup from './AlphabetSoup';
import type { EnhancedProps } from './AlphabetSoup';

type Props = $Diff<EnhancedProps, { width: *, height: * }>;

/**
 * This component renders and animates the text as an Alphabet Soup
 * Same props as AlphabetSoup without width and height which are calculated automatically
 * @returns renders the React component
 */
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
