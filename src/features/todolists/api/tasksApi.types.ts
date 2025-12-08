import { TaskPriority, TaskStatus } from "@/common/enums"
import z from "zod"
import { RequestStatus } from "@/common/types"

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  deadline: z.string().nullable(),
  startDate: z.string().nullable(),
  title: z.string(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.iso.datetime({ local: true }),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
})

export type DomainTask = z.infer<typeof domainTaskSchema>

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
export type DomainTaskWithStatus = DomainTask & {
  entityStatus: RequestStatus
}
export type GetTasksResponseWithStatus = {
  error: string | null
  totalCount: number
  items: DomainTaskWithStatus[]
}
