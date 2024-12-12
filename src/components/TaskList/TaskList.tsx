import { TaskListProps } from '../../@types/props.types'
import styles from './taskList.module.scss'

// *Lưu ý ở đây nếu như để props không thì nó sẽ bị lỗi
//do sự nghiêm khắc của ts. Nên mình cần interface
function TaskList(props: TaskListProps) {
  const { doneTaskList, todos } = props

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h1>
      <div className={styles.tasks}>
        {/* mình sẽ dùng map để render ra list todos, lưu ý phải kèm theo key */}
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input className={styles.taskCheckbox} type='checkbox' />
            <span className={styles.taskName}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn}>🖋️</button>
              <button className={styles.taskBtn}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList
