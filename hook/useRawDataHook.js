import { rawDummyPopularData, rawDummyNearbyData } from "../utils/rawData";

const useRawDataHook = (query_rawData, query_id) => {
  let data = [];
  if (query_rawData === "popular") {
    data = rawDummyPopularData?.filter(
      (filterItem) => filterItem?.job_id === query_id
    );
  }
  if (query_rawData === "nearby") {
    data = rawDummyNearbyData?.filter(
      (filterItem) => filterItem?.job_id === query_id
    );
  }

  return data;
};

export { useRawDataHook };
