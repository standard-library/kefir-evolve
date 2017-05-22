# kefir-evolve

Given an object containing Kefir streams as values, emits new objects with the stream events under the corresponding key.

## Installation

```shell
yarn add @standard-library/kefir-evolve
```

## Usage

```javascript
import evolve from "kefir-evolve";

const initial = { height: 0 };
const styles = evolve({
  color: Kefir.sequentially(1000, ["red", "green", "blue"]),
  height: Kefir.sequentially(500, [10, 50, 100])
}, initial);

// [evolve] <value> { height: 0 }
// [evolve] <value> { height: 10 }
// [evolve] <value> { height: 50, color: "red" }
// [evolve] <value> { height: 100, color: "red" }
// [evolve] <value> { height: 100, color: "green" }
// [evolve] <value> { height: 100, color: "blue" }
// [evolve] <end>
```
