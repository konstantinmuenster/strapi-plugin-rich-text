import byteSize from "byte-size";

import { Asset } from "../types";

/**
 * Possible files' extension colors
 *
 */
export const FILE_EXTENSION_COLORS = {
  doc: "#1483E9",
  docx: "#1483E9",
  odt: "#1483E9",
  pdf: "#DB2F2F",
  rtf: "#744FDC",
  tex: "#5a5a5b",
  txt: "#5a5a5b",
  pptx: "#E35200",
  ppt: "#E35200",
  mp3: "#eab456",
  mp4: "#f676a6",
  xls: "#11AE3D",
  html: "#2988f0",
  htm: "#2988f0",
  png: "#AA2284",
  jpg: "#D13359",
  jpeg: "#D13359",
  gif: "#f6af76",
  zip: "#4f566f",
  rar: "#4f566f",
  exe: "#e26f6f",
  svg: "#bf5252",
  key: "#00B2FF",
  sketch: "#FFC700",
  ai: "#FB601D",
  psd: "#388ae5",
  dmg: "#e26f6f",
  json: "#2988f0",
  csv: "#11AE3D",
  "": "#f0f0ff",
};

export type TFileExtension = keyof typeof FILE_EXTENSION_COLORS;

export const getUpdatedAudio = (asset: Asset) => ({
  id: asset.id,
  name: asset.name,
  src: asset.url,
});

export const getUpdatedFile = (asset: Asset) => ({
  href: asset.url,
  name: asset.name,
  dataContentType: asset.mime,
  documentExtension: asset.ext,
  documentId: asset.id,
  documentSize: asset.size,
});

export const getUpdatedImage = (asset: Asset) => ({
  src: asset.url,
  alt: asset.alternativeText,
  ...(asset.width && { width: asset.width }),
  ...(asset.height && { height: asset.height }),
  ...((asset.url?.includes("lazy") || asset.caption === "lazy") && {
    loading: "lazy",
  }),
});

export const getUpdatedVideo = (asset: Asset) => ({
  id: asset.id,
  src: asset.url,
  width: asset.width,
  height: asset.height,
});

export const formatBytes = (receivedBytes: number, decimals = 0) => {
  const { value, unit } = byteSize(receivedBytes * 1000, {
    precision: decimals,
  });

  if (!unit) {
    return "0B";
  }

  return `${value}${unit.toUpperCase()}`;
};
