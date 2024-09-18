import type { RgbaColor } from "../../../types/color";

import { round } from "./math";

const format = (number: number) => {
  const hex = number.toString(16);
  return hex.length < 2 ? "0" + hex : hex;
};

const matcher = /^#?([0-9A-F]{3,8})$/i;

export const validHex = (value: string, alpha?: boolean): boolean => {
  const match = matcher.exec(value);
  const length = match ? match[1].length : 0;

  return (
    length === 3 || // '#rgb' format
    length === 6 || // '#rrggbb' format
    (!!alpha && length === 4) || // '#rgba' format
    (!!alpha && length === 8) // '#rrggbbaa' format
  );
};

export const rgbaStringToRgba = (rgbaString: string): RgbaColor => {
  const matcher =
    /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
  const match = matcher.exec(rgbaString);

  if (!match) return { r: 0, g: 0, b: 0, a: 1 };

  return {
    r: Number(match[1]),
    g: Number(match[3]),
    b: Number(match[5]),
    a: match[7] === undefined ? 1 : Number(match[7]),
  };
};

export const rgbStringToRgba = rgbaStringToRgba;

export const rgbaToHex = ({ r, g, b, a }: RgbaColor): string => {
  const alphaHex = a < 1 ? format(round(a * 255)) : "";
  return "#" + format(r) + format(g) + format(b) + alphaHex;
};
