//_module chứa định nghĩa của các props truyền vào component

import { Todo } from './todo.type'

export interface TaskListProps {
  doneTaskList: boolean
  todos: Todo[]
}

export interface TaskInputProps {
  addTodo: (name: string) => void
}
