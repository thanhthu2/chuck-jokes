import type { AxiosError, AxiosResponse } from "axios";
export function transformData<T>(promise: Promise<AxiosResponse<T>>) {
  return promise.then(
    (val: AxiosResponse<T>) => [null, val || val] as unknown as [null, T],
    (err: AxiosError) => [err, null] as [AxiosError, null]
  );
}
