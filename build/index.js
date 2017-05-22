'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _kefir = require('kefir');

var _ramda = require('ramda');

var patches = function patches(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      values = _ref2[1];

  return values.map((0, _ramda.assoc)(name));
};
var patchBy = (0, _ramda.compose)((0, _ramda.map)(patches), _ramda.toPairs);

var evolve = function evolve(blueprint, initial) {
  var transformations = patchBy(blueprint);

  return _kefir.Kefir.merge(transformations).scan(function (c, t) {
    return t(c);
  }, initial);
};

exports.default = evolve;