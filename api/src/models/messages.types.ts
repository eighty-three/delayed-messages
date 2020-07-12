interface dbID {
  id: string;
}

interface dbMessage {
  target: number;
  message: string;
  expire: number;
}

interface searchID<T> {
  (id: string, table?: string): T
}

interface searchFull<T> {
  (id: string, message: string, target: number, table?: string): T
}

export type TGetMessage = searchID<Promise<dbMessage | null>>;
export type TDeleteMessage = searchID<Promise<dbID>>;
export type TCreateMessage = searchFull<Promise<dbID>>;

