/**
 * Removes mongoose custom properties from the given object.
 * @type {<T extends Object>(body: T) => Omit<T, ('createdAt' | 'updatedAt' | '__v')>}
 */
// eslint-disable-next-line no-unused-vars
export const sanitize = ({ createdAt, updatedAt, __v, ...rest }) => {
  return rest;
};
