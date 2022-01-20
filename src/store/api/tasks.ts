import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Task } from "../types";
import baseApi from ".";

const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<any, void>({
      query: () => "tasks",
      providesTags: ["Task"],
      transformResponse(response: Task[]) {
        return response.sort((a, b) => {
          if (a.completed) {
            return b.completed ? 0 : 11;
          }
          return b.completed ? -1 : 0;
        });
      },
    }),
    updateTask: builder.mutation<Task, Partial<Task> & Pick<Task, "id">>({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: () => ["Task"],
      transformResponse: (response: { data: Task }) => response.data,
      async onQueryStarted(patch, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTasks", undefined, (draft) => {
            // console.log(draft[0].description);
            draft.map((x: Task) => {
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
    addTask: builder.mutation<Task, Partial<Task>>({
      query(body) {
        return {
          url: `tasks`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<Task, Pick<Task, "id">>({
      query(body) {
        return {
          url: `tasks/${body.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export default tasksApi;
