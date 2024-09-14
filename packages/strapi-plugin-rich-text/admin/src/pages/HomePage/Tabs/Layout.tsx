import { Box } from "@strapi/design-system/Box";
import { GridLayout } from "@strapi/design-system/Layout";
import { ToggleInput } from "@strapi/design-system/ToggleInput";
import { Typography } from "@strapi/design-system/Typography";
import { useIntl } from "react-intl";

import { TabContent } from "../../../../../types/tabs";

type LayoutProps = TabContent;

const Layout = ({ values, handleChange }: LayoutProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Box marginTop="2rem" marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.table",
            defaultMessage: "Table",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.enable-table",
              defaultMessage: "Enable Table",
            })}
            size="S"
            name="table"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.table}
            onChange={() =>
              handleChange({
                target: {
                  name: "table",
                  value: !values.table,
                },
              })
            }
          />
        </Box>
      </GridLayout>

      <Box marginTop="2rem" marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.horizontal-rule",
            defaultMessage: "Horizontal Rule",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.enable-horizontal-rule",
              defaultMessage: "Enable horizontal rule",
            })}
            size="S"
            name="horizontal"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.horizontal}
            onChange={() =>
              handleChange({
                target: {
                  name: "horizontal",
                  value: !values.horizontal,
                },
              })
            }
          />
        </Box>
      </GridLayout>

      <Box marginTop="2rem" marginBottom={"1rem"}>
        <Typography variant={"beta"}>
          {formatMessage({
            id: "rich-text.settings.title.hard-break",
            defaultMessage: "Hardbreak",
          })}
        </Typography>
      </Box>

      <GridLayout>
        <Box>
          <ToggleInput
            label={formatMessage({
              id: "rich-text.settings.label.enable-hard-break",
              defaultMessage: "Enable hardbreaks",
            })}
            size="S"
            name="hardbreak"
            onLabel={formatMessage({
              id: "rich-text.settings.label.enabled",
              defaultMessage: "Enabled",
            })}
            offLabel={formatMessage({
              id: "rich-text.settings.label.disabled",
              defaultMessage: "Disabled",
            })}
            checked={values.hardbreak}
            onChange={() =>
              handleChange({
                target: {
                  name: "hardbreak",
                  value: !values.hardbreak,
                },
              })
            }
          />
        </Box>
      </GridLayout>
    </>
  );
};

export default Layout;
