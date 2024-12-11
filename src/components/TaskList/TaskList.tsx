import styles from './taskList.module.scss'

function TaskList() {
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>Hoan thanh</h1>
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
