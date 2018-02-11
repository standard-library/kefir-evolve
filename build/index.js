"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _kefir = require("kefir");

var toPairs = function toPairs(obj) {
  var ownProps = Object.keys(obj);
  var i = ownProps.length;
  var result = new Array(i); // preallocate the Array

  while (i--) {
    result[i] = [ownProps[i], obj[ownProps[i]]];
  }

  return result;
};

var assoc = function assoc(prop, val, obj) {
  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  result[prop] = val;

  return result;
};

var pairToPatch = function pairToPatch(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      values = _ref2[1];

  return values.map(function (v) {
    return function (b) {
      return assoc(name, v, b);
    };
  });
};
var patchBy = function patchBy(obj) {
  return toPairs(obj).map(pairToPatch);
};

var evolve = function evolve(blueprint, initial) {
  var transformations = patchBy(blueprint);

  return (0, _kefir.merge)(transformations).scan(function (c, t) {
    return t(c);
  }, initial);
};

exports.default = evolve;