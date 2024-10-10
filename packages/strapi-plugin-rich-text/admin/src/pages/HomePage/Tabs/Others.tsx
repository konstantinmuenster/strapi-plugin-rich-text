import { Box } from "@strapi/design-system/Box";
import { GridLayout } from "@strapi/design-system/Layout";
import { ToggleInput } from "@strapi/design-system/ToggleInput";
import { Typography } from "@strapi/design-system/Typography";
import { TextInput } from "@strapi/design-system";
import { useIntl } from "react-intl";

import { TabContent } from "../../../../../types/tabs";

type OtherProps = TabContent;

const Others = ({ values, handleChange }: OtherProps) => {
  const { formatMessage } = useIntl();

  const wordcount = values.other.wordcount;

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

      <Box marginTop={"2rem"} marginBottom={"1rem"}></Box>
    </>
  );
};

export default Others;
