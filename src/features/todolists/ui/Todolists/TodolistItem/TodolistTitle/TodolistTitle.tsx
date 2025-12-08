import { EditableSpan } from "@/common/components"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "@/features/todolists/api/todolistsApi"
import { RequestStatus } from "@/common/types"
import { useAppDispatch } from "@/common/hooks"
import { DomainTodolist } from "@/features/todolists/lib/types/types.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
  const dispatch = useAppDispatch()
  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }

  const deleteTodolist = () => {
    changeTodolistStatus("loading")
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        changeTodolistStatus("idle")
      })
  }

  const updateTodolistHandler = (title: string) => {
    changeTodolistStatus("loading")
    updateTodolistTitle({ id, title })
      .unwrap()
      .catch(() => {
        changeTodolistStatus("idle")
      })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title as string} onChange={updateTodolistHandler} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
