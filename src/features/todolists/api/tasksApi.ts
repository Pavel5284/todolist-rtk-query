import type { BaseResponse } from "@/common/types"
import type { DomainTask, GetTasksResponse, GetTasksResponseWithStatus, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "@/app/baseApi.ts"
import type { RequestStatus } from "@/common/types"
import { PAGE_SIZE } from "@/common/constants/constants.ts"

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponseWithStatus, { todolistId: string; params: { count?: number; page: number } }>(
      {
        query: ({ todolistId, params }) => ({
          url: `/todo-lists/${todolistId}/tasks`,
          params: { ...params, count: PAGE_SIZE },
        }),
        transformResponse: (response: GetTasksResponse): GetTasksResponseWithStatus => ({
          ...response,
          items: response.items.map((task) => ({ ...task, entityStatus: "idle" as RequestStatus })),
        }),
        providesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
      },
    ),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: model,
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = taskApi
