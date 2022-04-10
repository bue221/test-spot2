import ApiService from "services/api.service";
import { TypeGetAllSpots, TypeError, DetailSpot } from "../types/service.types";

interface paramsT {
  sort?: string | number;
  fields?: {
    name?: string | number;
    type?: string | number;
    square?: string | number;
  };
  page?: string | number;
}

const api = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    getSpots: builder.query<TypeGetAllSpots & TypeError, paramsT>({
      query: ({ sort, fields, page }) => {
        return {
          url: `spots${page ? `?page=${page}` : ""}${
            sort ? `&sort=-${sort}` : ""
          }${
            fields
              ? `${fields.name ? `&name=${fields.name}` : ""}${
                  fields.type ? `&term=${fields.type}` : ""
                }${
                  fields.square ? `&square_space=${fields.square}&type=3` : ""
                }`
              : ""
          }`,
        };
      },
    }),
    getSpotById: builder.query<DetailSpot & TypeError, any>({
      query: (id) => ({
        url: `spots/${id}`,
      }),
    }),
  }),
});

export const { useGetSpotByIdQuery, useGetSpotsQuery } = api;

export default api;
