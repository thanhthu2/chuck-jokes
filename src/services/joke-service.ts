import type { JokesResponse } from "@/types/jokes";
import type { AxiosError } from "axios";
import { transformData } from "../utils/helpers";
import { service } from "./base";

export async function getAllJokes(
  searhString: string
): Promise<[AxiosError<unknown, any>, null] | [null, JokesResponse]> {
  return await transformData<JokesResponse>(
    service.request({
      method: "get",
      url: `jokes/search?query=${searhString}`,
    })
  );
}

export async function getAllCategory() {
  return await transformData(
    service.request({
      method: "get",
      url: `jokes/categories`,
    })
  );
}
