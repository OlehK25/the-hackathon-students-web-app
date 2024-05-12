import useSWR from "swr";
import axios from "@/lib/axios";

export function useApiGet(url: string, params = {}, send = true) {
  const queryParams = new URLSearchParams(params).toString();
  const { data, error, mutate } = useSWR(
    send ? url + (queryParams ? `?${queryParams}` : "") : null,
    () =>
      axios
        .get(url + (queryParams ? `?${queryParams}` : ""))
        .then((res) => res.data)
        .catch((error) => {
          if (error.response && error.response.status !== 409) throw error;
        }),
  );

  const isLoading = send && !data && !error;

  return { data, error, mutate, isLoading };
}
