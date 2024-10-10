import { Box } from "@strapi/design-system/Box";
import { GridLayout } from "@strapi/design-system/Layout";
import { ToggleInput } from "@strapi/design-system/ToggleInput";
import { Typography } from "@strapi/design-system/Typography";
import { useIntl } from "react-intl";

import { addRemoveFromList } from "../../../utils/helpers";
import { TabContent } from "../../../../../types/tabs";

type TextProps = TabContent;

const Text = ({ values, handleChange }: TextProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Box marginBottom={"1rem"}>
        <Typography variant="beta" as="h2">
          {formatMessage({
            id: "rich-text.settings.title.heading",
            defaultMessage: "Heading",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.heading-1",
              defaultMessage: "Heading 1",
            })}
            size="S"
            name="headings"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.headings.includes("h1")}
            onChange={() =>
              handleChange({
                target: {
                  name: "headings",
                  value: addRemoveFromList([...values.headings], "h1"),
                },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.heading-2",
              defaultMessage: "Heading 2",
            })}
            size="S"
            name="headings"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.headings.includes("h2")}
            onChange={() =>
              handleChange({
                target: {
                  name: "headings",
                  value: addRemoveFromList([...values.headings], "h2"),
                },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.heading-3",
              defaultMessage: "Heading 3",
            })}
            size="S"
            name="headings"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.headings.includes("h3")}
            onChange={() =>
              handleChange({
                target: {
                  name: "headings",
                  value: addRemoveFromList([...values.headings], "h3"),
                },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.heading-4",
              defaultMessage: "Heading 4",
            })}
            size="S"
            name="headings"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.headings.includes("h4")}
            onChange={() =>
              handleChange({
                target: {
                  name: "headings",
                  value: addRemoveFromList([...values.headings], "h4"),
                },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.heading-5",
              defaultMessage: "Heading 5",
            })}
            size="S"
            name="headings"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.headings.includes("h5")}
            onChange={() =>
              handleChange({
                target: {
                  name: "headings",
                  value: addRemoveFromList([...values.headings], "h5"),
                },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.heading-6",
              defaultMessage: "Heading 6",
            })}
            size="S"
            name="headings"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.headings.includes("h6")}
            onChange={() =>
              handleChange({
                target: {
                  name: "headings",
                  value: addRemoveFromList([...values.headings], "h6"),
                },
              })
            }
          />
        </Box>
      </GridLayout>

      <Box marginTop={"2rem"} marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.text-styles",
            defaultMessage: "Text styles",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.abbreviation",
              defaultMessage: "Abbreviation",
            })}
            name="abbreviation"
            size="S"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.abbreviation}
            onChange={() =>
              handleChange({
                target: { name: "abbreviation", value: !values.abbreviation },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.alert",
              defaultMessage: "Alert",
            })}
            name="alert"
            size="S"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.alert}
            onChange={() =>
              handleChange({
                target: { name: "alert", value: !values.alert },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.bold",
              defaultMessage: "Bold",
            })}
            name="bold"
            size="S"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.bold}
            onChange={() =>
              handleChange({ target: { name: "bold", value: !values.bold } })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.italic",
              defaultMessage: "Italic",
            })}
            name="italic"
            size="S"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.italic}
            onChange={() =>
              handleChange({
                target: { name: "italic", value: !values.italic },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.strikethrough",
              defaultMessage: "Strikethrough",
            })}
            name="strikethrough"
            size="S"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.strikethrough}
            onChange={() =>
              handleChange({
                target: { name: "strikethrough", value: !values.strikethrough },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.underline",
              defaultMessage: "Underline",
            })}
            name="underline"
            size="S"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.underline}
            onChange={() =>
              handleChange({
                target: { name: "underline", value: !values.underline },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.code",
              defaultMessage: "Code",
            })}
            name="code"
            size="S"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.code}
            onChange={() =>
              handleChange({ target: { name: "code", value: !values.code } })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.block-quote",
              defaultMessage: "Blockquote",
            })}
            name="blockquote"
            size="S"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.blockquote}
            onChange={() =>
              handleChange({
                target: { name: "blockquote", value: !values.blockquote },
              })
            }
          />
        </Box>
      </GridLayout>

      <Box marginTop={"2rem"} marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.text-alignment",
            defaultMessage: "Text alignment",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.left",
              defaultMessage: "Left",
            })}
            size="S"
            name="align"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.align.includes("left")}
            onChange={() =>
              handleChange({
                target: {
                  name: "align",
                  value: addRemoveFromList([...values.align], "left"),
                },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.center",
              defaultMessage: "Center",
            })}
            size="S"
            name="align"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.align.includes("center")}
            onChange={() =>
              handleChange({
                target: {
                  name: "align",
                  value: addRemoveFromList([...values.align], "center"),
                },
              })
            }
          />
        </Box>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.right",
              defaultMessage: "Right",
            })}
            size="S"
            name="align"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.align.includes("right")}
            onChange={() =>
              handleChange({
                target: {
                  name: "align",
                  value: addRemoveFromList([...values.align], "right"),
                },
              })
            }
          />
        </Box>
        <Box></Box>
      </GridLayout>

      <Box marginTop={"2rem"} marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.lists",
            defaultMessage: "Lists",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.ordered-list",
              defaultMessage: "Ordered list",
            })}
            size="S"
            name="lists"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.lists.includes("ol")}
            onChange={() =>
              handleChange({
                target: {
                  name: "lists",
                  value: addRemoveFromList([...values.lists], "ol"),
                },
              })
            }
          />
        </Box>

        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.unordered-list",
              defaultMessage: "Unordered list",
            })}
            size="S"
            name="lists"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.lists.includes("ul")}
            onChange={() =>
              handleChange({
                target: {
                  name: "lists",
                  value: addRemoveFromList([...values.lists], "ul"),
                },
              })
            }
          />
        </Box>

        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.disable-short-ordered-list",
              defaultMessage: "Disable shorthand for ordered list",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.disable-short-ordered-list",
              defaultMessage:
                "Normally you can type: 1. and after the space it converts it to an ordered list. This can be annoying when typing dates.",
            })}
            size="S"
            name="lists"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.disableOrderedListShorthand}
            onChange={() =>
              handleChange({
                target: {
                  name: "disableOrderedListShorthand",
                  value: !values.disableOrderedListShorthand,
                },
              })
            }
          />
        </Box>
      </GridLayout>
    </>
  );
};

export default Text;
