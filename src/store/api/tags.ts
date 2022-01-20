import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Tag } from "../types";
import baseApi from ".";

const tagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<any, void>({
      query: () => "tags",
      providesTags: ["Tag"],
    }),
    updateTag: builder.mutation<Tag, Partial<Tag> & Pick<Tag, "id">>({
      query: ({ id, ...patch }) => ({
        url: `tags/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: () => ["Tag"],
      transformResponse: (response: { data: Tag }) => response.data,
      async onQueryStarted(patch, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tagsApi.util.updateQueryData("getTags", undefined, (draft) => {
            // console.log(draft[0].description);
            draft.map((x: Tag) => {
              // x.description = "Pasta";
              if (x.id === patch.id) {
                Object.assign(x, patch);
              }
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
    addTag: builder.mutation<Tag, Partial<Tag>>({
      query(body) {
        return {
          url: `tags`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Tag"],
    }),
    deleteTag: builder.mutation<Tag, Pick<Tag, "id">>({
      query(body) {
        return {
          url: `tags/${body.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const {
  useAddTagMutation,
  useGetTagsQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagsApi;

export default tagsApi;
