import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

function Todolist() {
  //_Tạo state
  //_State chuyên lưu danh sách các todo
  const [todos, setTodos] = useState<Todo[]>([])

  //_Tạo cái biến để filter các giá trị trong todos
  //_Ở đây sẽ có 2 list dành cho hoàn thành và chưa hoàn thành
  const doneTodos = todos.filter((todo) => todo.done)
  const notdoneTodos = todos.filter((todo) => !todo.done)

  //_func giúp mình add sản phẩm vào list
  //func này sẽ nhận vào name và setState todos lại
  //nghĩa là khi bấm dấu cộng nó sẽ lấy name(value của input)
  //tạo ra object và set vào trong state
  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      //lúc đầu chưa có check gì hết khi mới thêm vào nên trạng thái mặc định là false
      done: false,
      id: new Date().toISOString()
    }

    //thêm todo mới vào mảng todos bằng cách setState
    setTodos((prev) => {
      return [...prev, todo]
    })
  }

  return (
    <div className={styles.todolist}>
      <div className={styles.todolistContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList doneTaskList={false} />
        <TaskList doneTaskList={true} />
      </div>
    </div>
  )
}

export default Todolist
