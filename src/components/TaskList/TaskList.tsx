import { TaskListProps } from '../../@types/props.types'
import styles from './taskList.module.scss'

// *Lưu ý ở đây nếu như để props không thì nó sẽ bị lỗi
//do sự nghiêm khắc của ts. Nên mình cần interface
function TaskList(props: TaskListProps) {
  const { doneTaskList } = props

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h1>
      <div className={styles.tasks}>
        <div className={styles.task}>
          <input className={styles.taskCheckbox} type='checkbox' />
          <span className={styles.taskName}>hocbai</span>
          <div className={styles.taskActions}>
            <button className={styles.taskBtn}>🖋️</button>
            <button className={styles.taskBtn}>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskList
