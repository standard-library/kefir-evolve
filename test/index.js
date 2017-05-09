import test from "tape";
import { Kefir as K } from "kefir";

import spec from "..";

test('merges with initial object', (t) => {
  const output = spec({
    foo: K.constant(1),
    bar: K.constant(2)
  }, {});

  output.onValue(function ({ foo, bar }) {
    t.equal(foo, 1);
    t.equal(bar, 2);
    t.end();
  });
});

test('does not mutate initial object', (t) => {
  const initial = {}
  const output = spec({
    foo: K.constant(1),
    bar: K.constant(2)
  }, initial);

  t.deepEqual(initial, {});
  t.end();
});

test('combines multiple properties in sequence', (t) => {
  const output = spec({
    foo: K.sequentially(5, [1, 2, 3]),
    bar: K.sequentially(20, ["a", "b"])
  }, {});

  let values = [];

  output.onValue((s) => values.push(s));
  output.onEnd(function () {
    t.deepEqual(
      values,
      [
        {},
        { foo: 1 },
        { foo: 2 },
        { foo: 3 },
        { bar: 'a', foo: 3 },
        { bar: 'b', foo: 3 }
      ]);
    t.end();
  });
});
