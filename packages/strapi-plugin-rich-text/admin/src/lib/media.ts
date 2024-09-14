import { Asset } from "../types";

export const getUpdatedImage = (asset: Asset) => ({
  src: asset.url,
  alt: asset.alternativeText,
  ...(asset.width && { width: asset.width }),
  ...(asset.height && { height: asset.height }),
  ...((asset.url?.includes("lazy") || asset.caption === "lazy") && {
    loading: "lazy",
  }),
});
