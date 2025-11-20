import { TPaginatedResponse } from "@/types/response";
import { baseApi } from "./base";
import { successMessage } from "@/lib/toast";

export interface IGallery {
  _id: string;
  title: string;
  galleryImages?: string[];
  name?: string;
  email?: string;
  item_image?: string;
  slug: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  wheelProduct: string;
  tireProduct: string;
  suspensionProduct: string;
  rubbing: boolean;
  trimming: boolean;
  frontWheelSpacers: string;
  rearWheelSpacers: string;
  stance: string;
  wheelTitle: string;
  wheelFront: string;
  wheelFrontOffset: string;
  wheelFrontBackspacing: string;
  wheelRear: string;
  wheelRearOffset: string;
  wheelRearBackspacing: string;
  tireTitle: string;
  tireFront: string;
  tireRear: string;
  suspensionBrand: string;
  suspension: string;
  wheelDiameter: string;
  wheelWidth: string;
  tireHeight: string;
  tireWidth: string;
  wheelOffset: string;
  spacers: string;
  wheelBrand: string;
  wheelModel: string;
  tireBrand: string;
  tireModel: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  deletedBy: null | string;
  isDelete: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface FilterItem {
  value: string;
  count: number;
}

export interface IGalleryFilters {
  suspensionBrand: FilterItem[];
  wheelDiameter: FilterItem[];
  wheelWidth: FilterItem[];
  tireHeight: FilterItem[];
  tireWidth: FilterItem[];
  wheelOffset: FilterItem[];
  stanceType: FilterItem[];
  spacers: FilterItem[];
  wheelBrand: FilterItem[];
  wheelModel: FilterItem[];
  tireBrand: FilterItem[];
  tireModel: FilterItem[];
}

export const gallery = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGalleries: builder.query<
      TPaginatedResponse<{ galleries: IGallery[] }>,
      any
    >({
      query: (params) => ({
        url: "/galleries/client-list",
        params,
      }),
      providesTags: ["Gallery"],
    }),
    getGallery: builder.query<{ gallery: IGallery }, string>({
      query: (id) => ({
        url: `/galleries/${id}`,
      }),
    }),
    getFilterList: builder.query<IGalleryFilters, void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: "/galleries/filter-list",
          method: "POST",
        });

        // Forward error if baseQuery failed
        if (result.error) {
          return { error: result.error };
        }
        const filtersData = result.data as { filters: IGalleryFilters };
        // Validate and extract data safely
        if (result.data && "filters" in filtersData) {
          return { data: filtersData.filters };
        }

        // Fallback in case filters not present
        return { error: { status: 500, data: "Invalid response structure" } };
      },
    }),

    createGallery: builder.mutation<any, Record<string, any>>({
      query: (data) => ({
        url: "/galleries",
        method: "POST",
        data: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          successMessage(data?.message || "Gallery submitted successfully");
        } catch {
          // handle error globally if needed
        }
      },
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const {
  useGetGalleriesQuery,
  useGetFilterListQuery,
  useGetGalleryQuery,
  useCreateGalleryMutation,
} = gallery;
