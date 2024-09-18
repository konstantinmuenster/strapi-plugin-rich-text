type TabContent = {
  values: { [key: string]: any };
  handleChange: (event: { target: { name: string; value: any } }) => void;
};

export type { TabContent };
