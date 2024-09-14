import React from "react";

import { prefixFileUrlWithBackendUrl, useLibrary } from "@strapi/helper-plugin";

import { AllowedTypes, Asset } from "../../../types";

type MediaLibraryDialogProps = {
  allowedTypes?: Array<AllowedTypes>;
  isOpen: boolean;
  onChange: (assets: Array<Asset>) => void;
  onToggle: () => void;
};

const MediaLibraryDialog = ({
  allowedTypes = ["images"],
  isOpen = false,
  onChange,
  onToggle,
}: MediaLibraryDialogProps) => {
  const { components } = useLibrary();
  const MediaLibraryModal = components["media-library"];

  const handleSelectedAssets = (files: Array<Asset>) => {
    const formattedFiles = files.map((file) => ({
      ...file,
      url: prefixFileUrlWithBackendUrl(file.url) as unknown as string,
    }));

    onChange(formattedFiles);
  };

  if (!isOpen) return null;

  return (
    <MediaLibraryModal
      allowedTypes={allowedTypes}
      onClose={onToggle}
      onSelectAssets={handleSelectedAssets}
    />
  );
};

export default MediaLibraryDialog;
