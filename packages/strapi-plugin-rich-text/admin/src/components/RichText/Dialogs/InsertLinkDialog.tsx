import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { Combobox, ComboboxOption } from "@strapi/design-system/Combobox";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { Flex } from "@strapi/design-system/Flex";
import { Select, Option } from "@strapi/design-system/Select";
import { TextInput } from "@strapi/design-system/TextInput";

import { useState, useCallback, useEffect, ChangeEvent, useMemo } from "react";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";

import { getContentTypes, getEntries } from "../../../utils/api";
import { DialogProps } from "../../../types";
import { ContentType, Entry } from "../../../../../types/contentTypes";

export default function InsertLinkDialog({ editor, onExit }: DialogProps) {
  const [href, setHref] = useState<string>("");
  const [newTab, setNewTab] = useState<boolean>(false);
  const [shouldRemove, setShouldRemove] = useState<boolean>(false);

  const [contentTypeOptions, setContentTypeOptions] = useState([]);
  const [entriesOptions, setEntriesOptions] = useState([]);

  const [selectedContentType, setSelectedContentType] = useState<string>("");
  const [selectedEntry, setSelectedEntry] = useState("");

  const { formatMessage } = useIntl();

  const {
    data: contentTypes,
    // isLoading
  } = useQuery("content-type", getContentTypes);

  const { data: entries, isLoading: isLoadingEntries } = useQuery(
    ["content-entries", selectedContentType],
    () => getEntries(selectedContentType),
    {
      enabled: !!selectedContentType,
    }
  );

  const onClose = useCallback(() => {
    setHref("");
    setNewTab(false);
    onExit();
  }, []);

  const contentTypeUUID = useMemo(
    () =>
      contentTypes?.find(
        (type: ContentType) => type.name === selectedContentType
      )?.info?.singularName,
    [contentTypes, selectedContentType]
  );

  const entryUUID = useMemo(
    () => entries?.find((entry: Entry) => entry.uuid === selectedEntry)?.uuid,
    [entries, selectedEntry]
  );

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
    if (entries) {
      const options = entries.map((entry: Entry) => ({
        value: entry.uuid,
        label: entry.name,
      }));

      setEntriesOptions(options);
    }
  }, [entries]);

  useEffect(() => {
    if (selectedEntry) {
      const intendedLink = `/${contentTypeUUID ?? ""}/${entryUUID ?? ""}`;

      setHref(intendedLink);
    }
  }, [selectedEntry]);

  const onInsertLink = useCallback(() => {
    if (!href || shouldRemove) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href, target: newTab ? "_blank" : "_self" })
        .run();
    }

    onClose();
  }, [editor, href]);

  useEffect(() => {
    if (editor.isActive("link")) {
      const { href, target } = editor.getAttributes("link") as {
        href: string;
        target: string;
      };
      setHref(href);
      setNewTab(target === "_blank");
      setShouldRemove(true);
    }

    return () => {
      setHref("");
      setNewTab(false);
      setShouldRemove(false);
    };
  }, []);

  return (
    <Dialog
      onClose={onClose}
      title={formatMessage({
        id: "rich-text.editor.dialog.title.insert-link",
        defaultMessage: "Insert link",
      })}
      isOpen={true}
    >
      <DialogBody>
        <Flex direction="row" wrap="wrap" gap={4}>
          <Box>
            <Select
              label={formatMessage({
                id: "rich-text.editor.dialog.label.content-type",
                defaultMessage: "Select Content Type",
              })}
              placeholder={formatMessage({
                id: "rich-text.editor.dialog.placeholder.pick-content-type",
                defaultMessage: "Pick a content type",
              })}
              value={selectedContentType}
              onChange={(type: string) => setSelectedContentType(type)}
            >
              {contentTypeOptions.map((option) => (
                <Option key={`type-${option.value}`} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Box>

          {selectedContentType && (
            <Box>
              <Combobox
                label={formatMessage({
                  id: "rich-text.editor.dialog.label.entry",
                  defaultMessage: "Entry",
                })}
                placeholder={formatMessage({
                  id: "rich-text.editor.dialog.placeholder.search-entry",
                  defaultMessage: "Search or pick entities",
                })}
                name="entry"
                aria-label={formatMessage({
                  id: "rich-text.editor.dialog.label.entry",
                  defaultMessage: "Entry",
                })}
                value={selectedEntry}
                onChange={setSelectedEntry}
                loading={isLoadingEntries}
              >
                {entriesOptions.map((option) => (
                  <ComboboxOption
                    key={`entry-${option.value}`}
                    value={option.value}
                  >
                    {option.label}
                  </ComboboxOption>
                ))}
              </Combobox>
            </Box>
          )}
          <Box>
            <TextInput
              label={formatMessage({
                id: "rich-text.editor.dialog.label.link-url",
                defaultMessage: "Link URL",
              })}
              placeholder={formatMessage({
                id: "rich-text.editor.dialog.placeholder.link-url",
                defaultMessage: "Write or paste the url here",
              })}
              name="url"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setHref(e.target.value);
                setShouldRemove(false);
              }}
              value={href}
              aria-label={formatMessage({
                id: "rich-text.editor.dialog.label.url",
                defaultMessage: "URL",
              })}
            />
          </Box>
          <Box>
            <Checkbox
              value={newTab}
              onValueChange={(v: boolean) => {
                setNewTab(v);
                setShouldRemove(false);
              }}
            >
              {formatMessage({
                id: "rich-text.editor.dialog.checkbox.open-in-new-tab",
                defaultMessage: "Open in new tab",
              })}
            </Checkbox>
          </Box>
        </Flex>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={onClose} variant="tertiary">
            {formatMessage({
              id: "rich-text.editor.dialog.button.cancel",
              defaultMessage: "Cancel",
            })}
          </Button>
        }
        endAction={
          <Button
            onClick={() => onInsertLink()}
            variant={shouldRemove ? "danger-light" : "success-light"}
          >
            {formatMessage(
              {
                id: "rich-text.editor.dialog.button.link-confirm",
                defaultMessage: "{action} Link",
              },
              {
                action: shouldRemove ? "Remove" : "Insert",
              }
            )}
          </Button>
        }
      />
    </Dialog>
  );
}
