type ContentType = {
  name: string;
  attributes: Record<string, any>;
  info: Record<string, any>;
  key: string;
};

type Entry = {
  id: number;
  name: string;
  uuid: string;
};

export type { ContentType, Entry };
