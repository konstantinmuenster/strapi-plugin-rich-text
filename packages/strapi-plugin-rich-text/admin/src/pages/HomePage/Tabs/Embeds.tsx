import { Box } from "@strapi/design-system/Box";
import { GridLayout } from "@strapi/design-system/Layout";
import { ToggleInput } from "@strapi/design-system/ToggleInput";
import { TextInput } from "@strapi/design-system/TextInput";
import { Typography } from "@strapi/design-system/Typography";
import { useIntl } from "react-intl";

import type { TabContent } from "../../../../../types/tabs.ts";

type EmbedProps = TabContent;

const Embeds = ({ values, handleChange }: EmbedProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Box marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.image",
            defaultMessage: "Image",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.image",
              defaultMessage: "Images",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.images",
              defaultMessage: "Allow to add images to content",
            })}
            size="S"
            name="image.enabled"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.image.enabled}
            onChange={() =>
              handleChange({
                target: {
                  name: "image.enabled",
                  value: !values.image.enabled,
                },
              })
            }
          />
        </Box>
      </GridLayout>

      <Box marginTop={"1rem"} marginBottom={"1rem"}>
        <Typography variant={"delta"}>
          {formatMessage({
            id: "rich-text.settings.title.settings",
            defaultMessage: "Settings",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.image-inline",
              defaultMessage: "Inline",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.inline",
              defaultMessage: "Renders the image node inline",
            })}
            disabled={!values.image.enabled}
            size="S"
            name="image.inline"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.image.inline}
            onChange={() =>
              handleChange({
                target: {
                  name: "image.inline",
                  value: !values.image.inline,
                },
              })
            }
          />
        </Box>

        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.base64",
              defaultMessage: "Allow base64 images",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.base64",
              defaultMessage: "Allow images to be parsed as base64 strings",
            })}
            disabled={!values.image.enabled}
            size="S"
            name="image.allowBase64"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.image.allowBase64}
            onChange={() =>
              handleChange({
                target: {
                  name: "image.allowBase64",
                  value: !values.image.allowBase64,
                },
              })
            }
          />
        </Box>
      </GridLayout>

      <Box marginTop={"2rem"} marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.links",
            defaultMessage: "Links",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.links",
              defaultMessage: "Allow to make text into links",
            })}
            size="S"
            name="links.enabled"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.links.enabled}
            onChange={() =>
              handleChange({
                target: {
                  name: "links.enabled",
                  value: !values.links.enabled,
                },
              })
            }
          />
        </Box>
      </GridLayout>

      <Box marginTop={"1rem"} marginBottom={"1rem"}>
        <Typography variant={"delta"}>
          {formatMessage({
            id: "rich-text.settings.title.settings",
            defaultMessage: "Settings",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.auto-link",
              defaultMessage: "Auto Link",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.auto-link",
              defaultMessage: "If enabled, it adds links as you type.",
            })}
            disabled={!values.links.enabled}
            size="S"
            name="links.autolink"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.links.autolink}
            onChange={() =>
              handleChange({
                target: {
                  name: "links.autolink",
                  value: !values.links.autolink,
                },
              })
            }
          />
        </Box>

        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.open-on-click",
              defaultMessage: "Open on click",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.open-on-click",
              defaultMessage:
                "Open the link, when clicking it inside the editor",
            })}
            disabled={!values.links.enabled}
            size="S"
            name="links.openOnClick"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.links.openOnClick}
            onChange={() =>
              handleChange({
                target: {
                  name: "links.autolink",
                  value: !values.links.openOnClick,
                },
              })
            }
          />
        </Box>

        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.link-on-paste",
              defaultMessage: "Link on paste",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.link-on-paste",
              defaultMessage:
                "Adds a link to the current selection if the pasted content only contains an url",
            })}
            disabled={!values.links.enabled}
            size="S"
            name="links.linkOnPaste"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.links.linkOnPaste}
            onChange={() =>
              handleChange({
                target: {
                  name: "links.linkOnPaste",
                  value: !values.links.linkOnPaste,
                },
              })
            }
          />
        </Box>
        <Box></Box>
      </GridLayout>

      <GridLayout>
        <Box>
          <TextInput
            label={formatMessage({
              id: "rich-text.settings.label.re-attr-value",
              defaultMessage: "Relation attribute value",
            })}
            type="text"
            placeholder={formatMessage({
              id: "rich-text.settings.placeholder.rel-attr-value",
              defaultMessage: "Value of the rel attribute of links",
            })}
            name="rel"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange({
                target: {
                  name: "links.HTMLAttributes.rel",
                  value: e.target.value,
                },
              })
            }
            value={values.links.HTMLAttributes.rel}
            aria-label={formatMessage({
              id: "rich-text.settings.label.re-attr-value",
              defaultMessage: "Relation attribute value",
            })}
          />
        </Box>
      </GridLayout>

      <Box marginTop={"2rem"} marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.youtube",
            defaultMessage: "YouTube",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.enable-youtube",
              defaultMessage: "Enabled",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.enable-youtube",
              defaultMessage: "Allow to add YouTube video embeds",
            })}
            size="S"
            name="youtube.enabled"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.youtube.enabled}
            onChange={() =>
              handleChange({
                target: {
                  name: "youtube.enabled",
                  value: !values.youtube.enabled,
                },
              })
            }
          />
        </Box>

        <Box>
          <TextInput
            label={formatMessage({
              id: "rich-text.settings.label.default-video-width",
              defaultMessage: "Default video width",
            })}
            type="number"
            placeholder={formatMessage({
              id: "rich-text.settings.placeholder.default-video-width",
              defaultMessage: "width of the embed",
            })}
            name="width"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange({
                target: {
                  name: "youtube.width",
                  value: e.target.value,
                },
              })
            }
            value={values.youtube.width}
            aria-label={formatMessage({
              id: "rich-text.settings.label.default-video-width",
              defaultMessage: "Default video width",
            })}
          />
        </Box>

        <Box>
          <TextInput
            label={formatMessage({
              id: "rich-text.settings.label.default-video-height",
              defaultMessage: "Default video height",
            })}
            type="number"
            placeholder={formatMessage({
              id: "rich-text.settings.placeholder.default-video-height",
              defaultMessage: "height of the embed",
            })}
            name="height"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange({
                target: {
                  name: "youtube.height",
                  value: e.target.value,
                },
              })
            }
            value={values.youtube.height}
            aria-label={formatMessage({
              id: "rich-text.settings.label.default-video-height",
              defaultMessage: "Default video height",
            })}
          />
        </Box>
      </GridLayout>
    </>
  );
};

export default Embeds;
