import { useCallback, useEffect, useMemo, useState } from "react";
import { Stack } from "@strapi/design-system/Stack";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Field, FieldLabel } from "@strapi/design-system/Field";
import { Loader } from "@strapi/design-system/Loader";
import { Typography } from "@strapi/design-system/Typography";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";

import { createHTMLFromMarkdown } from "../../lib/markdown";
import { getSettings } from "../../utils/api";
import { Settings } from "../../../../types/settings";

import Editor, { isHTMLText, isJSONText } from "./Editor";

interface RichTextProps {
  error: string;
  name: string;
  description: null;
  hint: string;
  onChange: (props: {
    target: { name: string; value: any; type: string };
  }) => void;
  value: string | null;
  type: "wysiwyg";
  attribute: {
    type: "richtext";
  };
  required: boolean;
  placeholder: string | null;
  disabled: boolean;
  contentTypeUID: string;
  multiple: boolean;
  withDefaultValue: boolean;
  labelAction: any;
  intlLabel: {
    id: string;
    defaultMessage: string;
  };
  options: [
    {
      key: string;
      value: string;
    },
  ];
}

export default function RichText({
  attribute,
  name,
  onChange,
  required,
  labelAction,
  intlLabel,
  value,
  placeholder,
  description,
  disabled,
  error,
}: RichTextProps) {
  const [shouldMountEditor, setShouldMountEditor] = useState(false);
  const { formatMessage } = useIntl();

  const content = useMemo(() => {
    if (value) {
      return isHTMLText(value) || isJSONText(value)
        ? value
        : createHTMLFromMarkdown(value);
    } else {
      return "";
    }
  }, [value]);

  const { data: settings, isLoading } = useQuery<Settings>(
    "settings",
    getSettings
  );

  const handleChange = useCallback(
    (value: string) => {
      onChange({
        target: {
          name: name,
          type: attribute.type,
          value: value,
        },
      });
    },
    [onChange, name]
  );

  useEffect(() => {
    setShouldMountEditor(true);
  }, []);

  if (isLoading) {
    return (
      <Field required={required}>
        <Stack spacing={1}>
          <Box>
            <FieldLabel action={labelAction}>
              {formatMessage(intlLabel)}
            </FieldLabel>
          </Box>

          <Flex justifyContent="center" alignItems="center">
            <Box>
              <Loader>
                {formatMessage({
                  id: "rich-text.editor.loading-content",
                  defaultMessage: "Loading editor...",
                })}
              </Loader>
            </Box>
          </Flex>
        </Stack>
      </Field>
    );
  }

  return (
    <Field required={required}>
      <Stack spacing={1}>
        <Box>
          <FieldLabel action={labelAction}>
            {formatMessage(intlLabel)}
          </FieldLabel>
        </Box>
        {shouldMountEditor && (
          <Editor
            initialContent={content}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            settings={settings}
          />
        )}
        {error && (
          <Typography variant="pi" textColor="danger600">
            {formatMessage({ id: error, defaultMessage: error })}
          </Typography>
        )}
        {description && (
          <Typography variant="pi">{formatMessage(description)}</Typography>
        )}
      </Stack>
    </Field>
  );
}
