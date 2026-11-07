import { usePathname, useRouter, useSearchParams } from "next/navigation";

function useSearchQuery() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const getQuery = (queryId: string) => {
    return searchParams.get(queryId);
  };
  const setQuery = (
    keyOrObject: string | object,
    value?: string | number | null | undefined,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (keyOrObject !== "page") {
      params.delete("page");
    }
    if (typeof keyOrObject === "object" && keyOrObject !== null) {
      Object.entries(keyOrObject).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, String(value));
        }
      });
    } else {
      if (value === null || value === undefined || value === "") {
        params.delete(keyOrObject);
      } else {
        params.set(keyOrObject, String(value));
      }
    }
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return { getQuery, setQuery };
}

export default useSearchQuery;
