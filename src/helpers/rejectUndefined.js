// @flow
import reduce from 'lodash/reduce';

const rejectUndefined = (subject: { [string]: any }): { [string]: any } =>
  reduce(
    subject,
    (acc, value, key) => {
      if (subject[key] !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );

export default rejectUndefined;
