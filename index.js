import { Kefir as K } from 'kefir';
import { toPairs, map, assoc, compose } from 'ramda';

const patches = ([name, values]) => values.map(assoc(name));
const patchBy = compose(map(patches), toPairs);

const spec = (blueprint, initial) => {
  const transformations = patchBy(blueprint);

  return K.merge(transformations).scan((c, t) => t(c), initial);
}

export default spec;
