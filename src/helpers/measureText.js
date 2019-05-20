// @flow
/* eslint-env browser */

import units from 'units-css';
import rejectUndefined from './rejectUndefined';
import {
  DEFAULT_CANVAS,
  DEFAULT_FONT_STYLE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_LINE_HEIGHT,
} from '../defaultConstants';

export type Options = {
  fontFamily?: string,
  fontSize?: string,
  lineHeight?: number,
  fontWeight?: number,
  fontStyle?: string,
  canvas?: any,
};

export const defaultOptions = {
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAULT_FONT_SIZE,
  lineHeight: DEFAULT_LINE_HEIGHT,
  fontWeight: DEFAULT_FONT_WEIGHT,
  fontStyle: DEFAULT_FONT_STYLE,
  canvas: DEFAULT_CANVAS,
};

const measureHeight = (size, lineHeight) => {
  // If the line-height is unitless,
  // multiply it by the font size.
  if (!lineHeight.unit) {
    return units.parse(`${size.value * lineHeight.value}${size.unit}`);
  }

  // units-css requires the user to provide
  // DOM nodes for these units. We don't want
  // to pollute our API with that for the time being.
  const unitBlacklist = ['%', 'ch', 'cm', 'em', 'ex'];
  if (unitBlacklist.indexOf(lineHeight.unit) !== -1) {
    // eslint-disable-line no-magic-numbers
    throw new Error(
      `We do not currently support the unit ${lineHeight.unit}
      from the provided line-height ${lineHeight.value}.
      Unsupported units include ${unitBlacklist.join(', ')}.`,
    );
  }

  // Otherwise, the height is equivalent
  // to the provided line height.
  // Non-px units need conversion.
  if (lineHeight.unit === 'px') {
    return lineHeight;
  }
  return units.parse(units.convert(lineHeight, 'px'));
};

/**
 * Measures the widths and the height of a text
 *
 * @param {string | Array<string>} text text to be measured or array with multiple lines of text.
 * @param {object} [options={}] object with options
 * @param {string} [options.fontSize='20px'] fontSize of the text.
 * @param {number} [options.lineHeight=1.3] lineHeight of the text.
 * @param {string} [options.fontFamily='Georgia'] fontFamily of the text.
 * @param {string} [options.fontWeight=400] fontWeight of the text.
 * @param {string} [options.fontStyle='normal'] fontStyle of the text.
 * @param {string} [options.canvas=created by default] canvas used to render the text to measure. If none provided, one us created and used.
 * @returns {{ text: string, width: { value: number, units: string }, height: string }} returns an object with the width, height and the text or longest text in case
 * of multiline.
 */
const measureText = (
  text: string | Array<string>,
  options: Options = defaultOptions,
): {
  text: string,
  width: { value: number, units: string },
  height: { value: number, units: string },
} => {
  const { fontFamily, fontSize, lineHeight, fontWeight, fontStyle, canvas } = {
    ...defaultOptions,
    ...rejectUndefined(options),
  };
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontWeight} ${fontStyle} ${fontSize} ${fontFamily}`;

  const measure = line => {
    return {
      text: line,
      width: units.parse(`${ctx.measureText(line).width}px`),
      height: measureHeight(units.parse(fontSize), units.parse(lineHeight)),
    };
  };

  // If multiline, measure the bounds
  // of all of the lines combined
  if (Array.isArray(text)) {
    return text.map(measure).reduce((prev, curr) => {
      const width =
        curr.width.value > prev.width.value ? curr.width : prev.width;
      const height = units.parse(
        `${prev.height.value + curr.height.value}${curr.height.unit}`,
      );
      const longest =
        curr.text.length > prev.text.length ? curr.text : prev.text;
      return { width, height, text: longest };
    });
  }

  return measure(text);
};

export default measureText;
