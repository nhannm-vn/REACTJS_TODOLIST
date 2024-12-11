import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

function Todolist() {
  return (
    <div className={styles.todolist}>
      <div className={styles.todolistContainer}>
        <TaskInput />
        <TaskList />
        <TaskList />
      </div>
    </div>
  )
}

export default Todolist
