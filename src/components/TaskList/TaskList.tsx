import PropTypes from 'prop-types'
import { TaskListProps } from '../../@types/props.types'
import styles from './taskList.module.scss'
import { TodoTypes } from '../../PropTypes/todo.proptypes'

// *Lưu ý ở đây nếu như để props không thì nó sẽ bị lỗi
//do sự nghiêm khắc của ts. Nên mình cần interface
function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo } = props

  //_truyền hàm set lại check done thì cũng được. Tuy nhiên thì
  //mình muốn cho nó nghệ tí thì viết thêm cái hàm
  const onChangeCheckBox = (idToDo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTodo(idToDo, event.target.checked)
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h1>
      <div className={styles.tasks}>
        {/* mình sẽ dùng map để render ra list todos, lưu ý phải kèm theo key */}
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              className={styles.taskCheckbox} //
              type='checkbox'
              onChange={onChangeCheckBox(todo.id)}
              checked={todo.done}
            />
            {/* giúp cho hiển thị chi tiết tên phụ thuộc vào trạng thái */}
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button
                className={styles.taskBtn}
                onClick={() => {
                  startEditTodo(todo.id)
                }}
              >
                🖋️
              </button>
              <button
                className={styles.taskBtn}
                onClick={() => {
                  deleteTodo(todo.id)
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

TaskList.propTypes = {
  doneTaskList: PropTypes.bool.isRequired,
  todos: PropTypes.arrayOf(TodoTypes),
  handleDoneTodo: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

export default TaskList
