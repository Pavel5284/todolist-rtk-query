import style from "./TaskItem.module.css"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "@/common/enums"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"
import { DomainTaskWithStatus, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { DomainTodolist } from "@/features/todolists/lib/types/types.ts"

type Props = {
  task: DomainTaskWithStatus
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [updateTask] = useUpdateTaskMutation()
  const [removeTask] = useRemoveTaskMutation()
  const deleteTask = () => {
    removeTask({ todolistId: todolist.id, taskId: task.id })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model: UpdateTaskModel = {
      status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }

    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const changeTaskTitle = (title: string) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }

    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const disabled = task.entityStatus === "loading" || todolist.entityStatus === "loading"

  return (
    <div className={style.wrapper}>
      <ListItem sx={getListItemSx(isTaskCompleted)}>
        <div>
          <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={disabled} />
          <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={disabled} />
        </div>
        <IconButton onClick={deleteTask} disabled={disabled}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <span className={disabled || isTaskCompleted ? style.date__disabled : style.date}>
        {new Date(task.addedDate).toLocaleDateString()}
      </span>
    </div>
  )
}
