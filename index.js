import { merge as mergeStreams } from 'kefir';
import { toPairs, map, assoc, compose } from 'ramda';

const patches = ([name, values]) => values.map(assoc(name));
const patchBy = compose(map(patches), toPairs);

const evolve = (blueprint, initial) => {
  const transformations = patchBy(blueprint);

  return mergeStreams(transformations).scan((c, t) => t(c), initial);
}

export default evolve;
