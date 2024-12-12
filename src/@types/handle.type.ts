import { Todo } from './todo.type'

// export interface HandleNewTodos {
//   (todos: Todo[]): Todo[]
// }

export type HandleNewTodos = (todos: Todo[]) => Todo[]
