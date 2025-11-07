import { apiCall } from "@/lib/api";
import { buildQueryParams } from "@/lib/utils";
import { ApiResponse, SearchParams } from "@/types";
import { HotelListData } from "./types";

export const getHotels = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<ApiResponse<HotelListData>> => {
  const queryString = buildQueryParams(searchParams);
  const url = `/hotels/agent${queryString ? `?${queryString}` : ""}`;
  const apiResponse = await apiCall<HotelListData>(url);

  console.log({
    hotels: apiResponse.data.hotels,
    filter: apiResponse.data.filter_pricing,
  });

  return apiResponse;
};
