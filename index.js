import { merge as mergeStreams } from "kefir";

const toPairs = function(obj) {
  var ownProps = Object.keys(obj);
  var i = ownProps.length;
  var result = new Array(i); // preallocate the Array

  while (i--) {
    result[i] = [ownProps[i], obj[ownProps[i]]];
  }

  return result;
};

const assoc = (prop, val, obj) => {
  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  result[prop] = val;

  return result;
};

const pairToPatch = ([name, values]) => values.map(v => b => assoc(name, v, b));
const patchBy = obj => toPairs(obj).map(pairToPatch);

const evolve = (blueprint, initial) => {
  const transformations = patchBy(blueprint);

  return mergeStreams(transformations).scan((c, t) => t(c), initial);
};

export default evolve;
