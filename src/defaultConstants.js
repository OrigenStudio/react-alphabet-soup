// @flow
/* eslint-env browser */
export const DEFAULT_CANVAS =
  typeof document !== `undefined` ? document.createElement('canvas') : null;
export const DEFAULT_FONT_WEIGHT = 400;
export const DEFAULT_WIDTH = 100;
export const DEFAULT_HEIGHT = 100;
export const DEFAULT_FONT_STYLE = 'normal';
export const DEFAULT_FONT_FAMILY = 'Georgia';
export const DEFAULT_FONT_SIZE = '20px';
export const DEFAULT_LINE_HEIGHT = 1.3;
export const DEFAULT_TRANSITION_STYLE = 'constant';
export const DEFAULT_TRANSITION_SPEED_MULTIPLIER = 1;
export const DEFAULT_UNTIDY_ON_HOVER = true;
