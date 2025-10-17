// node_modules/@babylonjs/core/Maths/math.scalar.functions.js
function WithinEpsilon(a, b, epsilon = 1401298e-51) {
  return Math.abs(a - b) <= epsilon;
}
function RandomRange(min, max) {
  if (min === max) {
    return min;
  }
  return Math.random() * (max - min) + min;
}
function Lerp(start, end, amount) {
  return start + (end - start) * amount;
}
function Clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}
function NormalizeRadians(angle) {
  angle -= Math.PI * 2 * Math.floor((angle + Math.PI) / (Math.PI * 2));
  return angle;
}
function ToHex(i) {
  const str = i.toString(16);
  if (i <= 15) {
    return ("0" + str).toUpperCase();
  }
  return str.toUpperCase();
}
function ILog2(value) {
  if (Math.log2) {
    return Math.floor(Math.log2(value));
  }
  if (value < 0) {
    return NaN;
  } else if (value === 0) {
    return -Infinity;
  }
  let n = 0;
  if (value < 1) {
    while (value < 1) {
      n++;
      value = value * 2;
    }
    n = -n;
  } else if (value > 1) {
    while (value > 1) {
      n++;
      value = Math.floor(value / 2);
    }
  }
  return n;
}
function HighestCommonFactor(a, b) {
  const r = a % b;
  if (r === 0) {
    return b;
  }
  return HighestCommonFactor(b, r);
}

export {
  WithinEpsilon,
  RandomRange,
  Lerp,
  Clamp,
  NormalizeRadians,
  ToHex,
  ILog2,
  HighestCommonFactor
};
//# sourceMappingURL=chunk-DSTTD374.js.map
