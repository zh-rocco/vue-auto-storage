interface CustomStorage {
  getItem: (key: string) => any;
  setItem: (key: string, value: any) => void;
  removeItem: (key?: string) => void;
  clear: (key?: string) => void;
}

interface Options {
  debounce?: number;
  storage?: CustomStorage;
}
