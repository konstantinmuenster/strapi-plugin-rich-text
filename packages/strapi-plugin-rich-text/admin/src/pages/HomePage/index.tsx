import { Main } from "@strapi/design-system/Main";
import { HeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import { Button } from "@strapi/design-system/Button";
import { Box } from "@strapi/design-system/Box";
import {
  Tabs,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from "@strapi/design-system/Tabs";
import { Formik } from "formik";
import {
  Form,
  LoadingIndicatorPage,
  useNotification,
  useOverlayBlocker,
} from "@strapi/helper-plugin";
import Check from "@strapi/icons/Check";

import { useQuery, useMutation, useQueryClient } from "react-query";

import { getSettings, updateSettings } from "../../utils/api";
import { Settings } from "../../../../types/settings";
import { deepMerge } from "../../../../utils/merge";
import defaultSettings from "../../../../server/config/defaults";

import TextTabContent from "./Tabs/Text";
import LayoutTabContent from "./Tabs/Layout";
import EmbedsTabContent from "./Tabs/Embeds";
import OtherTabContent from "./Tabs/Others";
import { TabContent } from "../../../../types/tabs";
import { useIntl } from "react-intl";

const HomePage = () => {
  const toggleNotification = useNotification();
  const { lockApp, unlockApp } = useOverlayBlocker();

  const { formatMessage } = useIntl();

  const queryClient = useQueryClient();
  const query = useQuery("settings", getSettings);
  const mutation = useMutation(
    (settings: Settings) => updateSettings(settings),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("settings");
        toggleNotification({
          type: "success",
          message: {
            id: "rich-text.notifications.message.saved",
            defaultMessage: "Saved",
          },
        });
        unlockApp();
      },
      onError: async () => {
        toggleNotification({
          type: "warning",
          message: {
            id: "notifications.message.save-failed",
            defaultMessage: "Save failed",
          },
        });
        unlockApp();
      },
    }
  );

  if (query.isLoading) {
    return (
      <Main aria-busy="true">
        <HeaderLayout
          title={formatMessage({
            id: "rich-text.settings.title.home",
            defaultMessage: "Richtext Editor Settings",
          })}
          subtitle={formatMessage({
            id: "rich-text.settings.subtitle.home",
            defaultMessage: "Change how the editor should behave",
          })}
        />
        <ContentLayout>
          <LoadingIndicatorPage />
        </ContentLayout>
      </Main>
    );
  }

  const mergedSettings = deepMerge(defaultSettings, query.data);

  return (
    <Main aria-busy={query.isLoading}>
      <Formik
        initialValues={mergedSettings}
        onSubmit={async (values: Pick<TabContent, "values">) => {
          lockApp();
          await mutation.mutateAsync(values);
        }}
      >
        {({ values, handleChange }: TabContent) => {
          return (
            <Form>
              <HeaderLayout
                title={formatMessage({
                  id: "rich-text.settings.title.home",
                  defaultMessage: "Richtext Editor Settings",
                })}
                subtitle={formatMessage({
                  id: "rich-text.settings.subtitle.home",
                  defaultMessage: "Change how the editor should behave",
                })}
                primaryAction={
                  <Button
                    isLoading={mutation.isLoading}
                    type="submit"
                    startIcon={<Check />}
                    size="L"
                  >
                    {formatMessage({
                      id: "rich-text.settings.button.save",
                      defaultMessage: "Save",
                    })}
                  </Button>
                }
              />
              <ContentLayout>
                <Box
                  background="neutral0"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={6}
                  paddingBottom={6}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  <TabGroup
                    label={formatMessage({
                      id: "rich-text.settings.label.tabs",
                      defaultMessage: "Tab's titles",
                    })}
                    id="tabs"
                    variant="simple"
                  >
                    <Tabs>
                      <Tab>
                        {formatMessage({
                          id: "rich-text.settings.tab.text",
                          defaultMessage: "Text",
                        })}
                      </Tab>
                      <Tab>
                        {formatMessage({
                          id: "rich-text.settings.tab.layout",
                          defaultMessage: "Layout",
                        })}
                      </Tab>
                      <Tab>
                        {formatMessage({
                          id: "rich-text.settings.tab.embeds",
                          defaultMessage: "Embeds",
                        })}
                      </Tab>
                      <Tab>
                        {formatMessage({
                          id: "rich-text.settings.tab.others",
                          defaultMessage: "Others",
                        })}
                      </Tab>
                    </Tabs>
                    <TabPanels>
                      <TabPanel>
                        <Box
                          color="neutral800"
                          padding={4}
                          background="neutral0"
                        >
                          <TextTabContent
                            values={values}
                            handleChange={handleChange}
                          />
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        <Box
                          color="neutral800"
                          padding={4}
                          background="neutral0"
                        >
                          <LayoutTabContent
                            values={values}
                            handleChange={handleChange}
                          />
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        {/* Embeds tab content*/}
                        <Box
                          color="neutral800"
                          padding={4}
                          background="neutral0"
                        >
                          <EmbedsTabContent
                            values={values}
                            handleChange={handleChange}
                          />
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        {/* Other tab content*/}
                        <Box
                          color="neutral800"
                          padding={4}
                          background="neutral0"
                        >
                          <OtherTabContent
                            values={values}
                            handleChange={handleChange}
                          />
                        </Box>
                      </TabPanel>
                    </TabPanels>
                  </TabGroup>
                  {/* Main box end*/}
                </Box>
              </ContentLayout>
            </Form>
          );
        }}
      </Formik>
    </Main>
  );
};

export default HomePage;
