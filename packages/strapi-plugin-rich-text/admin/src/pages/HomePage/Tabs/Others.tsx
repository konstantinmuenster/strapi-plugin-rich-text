import { Box } from "@strapi/design-system/Box";
import { MultiSelect, MultiSelectOption } from "@strapi/design-system/Select";
import { GridLayout } from "@strapi/design-system/Layout";
import { Stack } from "@strapi/design-system/Stack";
import { ToggleInput } from "@strapi/design-system/ToggleInput";
import { Typography } from "@strapi/design-system/Typography";
import { TextInput } from "@strapi/design-system";

import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";

import { ContentType } from "../../../../../types/contentTypes";
import { TabContent } from "../../../../../types/tabs";
import { getContentTypes } from "../../../utils/api";
import { addRemoveFromList } from "../../../utils/helpers";

type OtherProps = TabContent;

const Others = ({ values, handleChange }: OtherProps) => {
  const [contentTypeOptions, setContentTypeOptions] = useState<
    Array<Record<string, string>>
  >([]);
  const [labelOptions, setLabelOptions] = useState<Array<string>>([]);
  const [uuidOptions, setUuidOptions] = useState<Array<string>>([]);

  const { formatMessage } = useIntl();

  const wordcount = values.other.wordcount;

  const {
    data: contentTypes,
    // isLoading
  } = useQuery("content-type", getContentTypes);

  useEffect(() => {
    if (contentTypes) {
      const options = contentTypes.map((type: ContentType) => ({
        value: type.name,
        label: type.info.displayName,
      }));

      setContentTypeOptions(options);
    }
  }, [contentTypes]);

  useEffect(() => {
    if (values.other.labelFields) setLabelOptions(values.other.labelFields);
    if (values.other.uuidFields) setUuidOptions(values.other.uuidFields);
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    type: "label" | "uuid"
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const inputValue = event.currentTarget.value;

      if (inputValue) {
        if (type === "label") {
          setLabelOptions((prevOptions) => [inputValue, ...prevOptions]);
        }

        if (type === "uuid")
          setUuidOptions((prevOptions) => [inputValue, ...prevOptions]);

        event.currentTarget.value = "";
      }
    }
  };

  return (
    <>
      <Box marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.outputs",
            defaultMessage: "Outputs",
          })}
        </Typography>
      </Box>

      <GridLayout gridCols={2} gap={4}>
        <Stack spacing={4}>
          <Box>
            <ToggleInput
              label={formatMessage({
                id: "rich-text.settings.label.word-count",
                defaultMessage: "Word count",
              })}
              hint={formatMessage({
                id: "rich-text.settings.hint.word-count",
                defaultMessage: "Show a word counter under the editor",
              })}
              size="S"
              name="other.wordcount"
              onLabel={formatMessage({
                id: "rich-text.settings.label.enabled",
                defaultMessage: "Enabled",
              })}
              offLabel={formatMessage({
                id: "rich-text.settings.label.disabled",
                defaultMessage: "Disabled",
              })}
              checked={wordcount}
              onChange={() =>
                handleChange({
                  target: {
                    name: "other.wordcount",
                    value: !wordcount,
                  },
                })
              }
            />
          </Box>
          <Box>
            <TextInput
              label={formatMessage({
                id: "rich-text.settings.label.character-limit",
                defaultMessage: "Character Limit",
              })}
              type="number"
              placeholder={formatMessage({
                id: "rich-text.settings.placeholder.character-limit",
                defaultMessage:
                  "The maximum number of characters for the content",
              })}
              name="characterLimit"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange({
                  target: {
                    name: "other.characterLimit",
                    value: e.target.value,
                  },
                })
              }
              value={values.other.characterLimit}
              aria-label={formatMessage({
                id: "rich-text.settings.label.character-limit",
                defaultMessage: "Character Limit",
              })}
            />
          </Box>
        </Stack>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.save-json",
              defaultMessage: "Save content as JSON",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.save-json",
              defaultMessage:
                "Save editor content as JSON instead of raw HTML. NOTE: You will have to save pages again, as changing this setting will NOT auto update your currently saved content",
            })}
            size="S"
            name="other.saveJson"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.other.saveJson}
            onChange={() =>
              handleChange({
                target: {
                  name: "other.saveJson",
                  value: !values.other.saveJson,
                },
              })
            }
          />
        </Box>
      </GridLayout>

      <Box marginTop={"2rem"} marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.content",
            defaultMessage: "Content",
          })}
        </Typography>
      </Box>

      <GridLayout gridCols={2} gap={4}>
        <Box>
          <MultiSelect
            withTags
            label={formatMessage({
              id: "rich-text.settings.label.content-types",
              defaultMessage: "Content Types",
            })}
            hint={formatMessage({
              id: "rich-text.settings.hint.content-types",
              defaultMessage:
                "By default only the custom content types (api) are pickable.",
            })}
            value={values.other.types}
            onChange={(value: Array<String>) =>
              handleChange({
                target: {
                  name: "other.types",
                  value,
                },
              })
            }
          >
            {contentTypeOptions.map(({ value, label }) => (
              <MultiSelectOption key={crypto.randomUUID()} value={value}>
                {label}
              </MultiSelectOption>
            ))}
          </MultiSelect>
        </Box>
        <Stack spacing={4}>
          <Box>
            <TextInput
              label={formatMessage({
                id: "rich-text.settings.label.add-label",
                defaultMessage: "Label",
              })}
              placeholder={formatMessage({
                id: "rich-text.settings.placeholder.add-label",
                defaultMessage: "Add a new label field",
              })}
              hint={formatMessage({
                id: "rich-text.settings.hint.insert-options",
                defaultMessage: "Write a label and press ENTER",
              })}
              name="characterLimit"
              aria-label={formatMessage({
                id: "rich-text.settings.label.add-label",
                defaultMessage: "Label",
              })}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(event, "label")
              }
            />
          </Box>
          <Box>
            <MultiSelect
              withTags
              label={formatMessage({
                id: "rich-text.settings.label.label-fields",
                defaultMessage: "Label Fields",
              })}
              hint={formatMessage({
                id: "rich-text.settings.hint.label-fields",
                defaultMessage:
                  "It states the property to use as label in select inputs, i. e., presentational property.\nBy default name or title properties are taken as label fields.",
              })}
              value={values.other.labelFields}
              onChange={(value: Array<String>) =>
                handleChange({
                  target: {
                    name: "other.labelFields",
                    value,
                  },
                })
              }
            >
              {labelOptions.map((label) => (
                <MultiSelectOption key={crypto.randomUUID()} value={label}>
                  {label}
                </MultiSelectOption>
              ))}
            </MultiSelect>
          </Box>
        </Stack>
        <Stack spacing={4}>
          <Box>
            <TextInput
              label={formatMessage({
                id: "rich-text.settings.label.add-uuid",
                defaultMessage: "UUID",
              })}
              placeholder={formatMessage({
                id: "rich-text.settings.placeholder.add-uuid",
                defaultMessage: "Add a new uuid field",
              })}
              hint={formatMessage({
                id: "rich-text.settings.hint.insert-options",
                defaultMessage: "Write a label and press ENTER",
              })}
              name="characterLimit"
              aria-label={formatMessage({
                id: "rich-text.settings.label.add-uuid",
                defaultMessage: "UUID",
              })}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(event, "uuid")
              }
            />
          </Box>
          <Box>
            <MultiSelect
              withTags
              label={formatMessage({
                id: "rich-text.settings.label.uuidFields",
                defaultMessage: "UUID Fields",
              })}
              hint={formatMessage({
                id: "rich-text.settings.hint.uuid-fields",
                defaultMessage:
                  "It states the property to use as the value in select inputs, i. e., identifier property.\nBy default slug properties is taken as label field .",
              })}
              value={values.other.uuidFields}
              onChange={(value: Array<String>) =>
                handleChange({
                  target: {
                    name: "other.uuidFields",
                    value,
                  },
                })
              }
            >
              {uuidOptions.map((field) => (
                <MultiSelectOption key={crypto.randomUUID()} value={field}>
                  {field}
                </MultiSelectOption>
              ))}
            </MultiSelect>
          </Box>
        </Stack>
      </GridLayout>
    </>
  );
};

export default Others;
