import z from "zod"

/*export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}*/

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  addedDate: z.string().nullable(),
  order: z.number().nullable(),
})

export type Todolist = z.infer<typeof todolistSchema>
