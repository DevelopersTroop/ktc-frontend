export type IApiRes<T, K extends string> = {
  total?: number;
  pages?: number;
} & Record<K, T>;
