import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type TValue = string | boolean | number | null | undefined;
type TReturnedValue = string | null;

interface IUseFiltersHook {
  setParamFilter: (name: string, value: TValue) => void;
  getParamFilter: (name: string) => TReturnedValue;
}

const useFilters = (): IUseFiltersHook => {
  const location = useLocation();
  const navigate = useNavigate();

  const setParamFilter = useCallback(
    (name: string, value: TValue) => {
      const searchParams = new URLSearchParams(location.search);

      if (value === null || value === undefined || value === "") {
        searchParams.delete(name);
      } else {
        searchParams.set(name, value.toString());
      }

      navigate({ search: searchParams.toString() }, { replace: true });
    },
    [location.search, navigate]
  );

  const getParamFilter = useCallback(
    (name: string): TReturnedValue => {
      const searchParams: any = new URLSearchParams(location.search);
      return searchParams ? JSON.parse(searchParams.get(name)) : null;
    },
    [location.search]
  );

  return { setParamFilter, getParamFilter };
};

export default useFilters;
