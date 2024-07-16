import { useCallback, useEffect, useMemo, useState } from "react";
import { Stack } from "@strapi/design-system/Stack";
import { Box } from "@strapi/design-system/Box";
import { Field, FieldLabel } from "@strapi/design-system/Field";
import { Typography } from "@strapi/design-system/Typography";
import { useIntl } from "react-intl";

import Editor, { isRichText } from "./Editor";
import { createHTMLFromMarkdown } from "../../lib/markdown";

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
  const { formatMessage } = useIntl();
  const [shouldMountEditor, setShouldMountEditor] = useState(false);

  const content = useMemo(() => {
    if (value) {
      return isRichText(value) ? value : createHTMLFromMarkdown(value);
    } else {
      return "";
    }
  }, [value]);

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
