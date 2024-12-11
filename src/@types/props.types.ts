//_module chứa định nghĩa của các props truyền vào component

export interface TaskListProps {
  doneTaskList: boolean
}

export interface TaskInputProps {
  addTodo: (name: string) => void
}
