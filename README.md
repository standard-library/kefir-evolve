# kefir-spec

Given an object containing Kefir streams as values, emits new objects with the stream events under the corresponding key.

## Installation

```shell
yarn add @standard-library/kefir-spec
```

## Usage

```javascript
const styles = spec({
  color: Kefir.sequentially(1000, ["red", "green", "blue"]),
  height: Kefir.sequentially(500, [10, 50, 100])
});

// [spec] <value> { height: 10 }
// [spec] <value> { height: 50, color: "red" }
// [spec] <value> { height: 100, color: "red" }
// [spec] <value> { height: 100, color: "green" }
// [spec] <value> { height: 100, color: "blue" }
// [spec] <end>
```
