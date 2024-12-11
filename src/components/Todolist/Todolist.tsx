import TaskInput from '../TaskInput'
import styles from './todoList.module.scss'

function Todolist() {
  return (
    <div className={styles.todolist}>
      <div className={styles.todolistContainer}>
        <TaskInput />
      </div>
    </div>
  )
}

export default Todolist
