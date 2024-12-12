import { useState } from 'react'
import { TaskInputProps } from '../../@types/props.types'
import styles from './taskInput.module.scss'
function TaskInput(props: TaskInputProps) {
  //_tạo state name để có chỗ mà lưu trữ giá trị của
  //value ô input cũng như đảm bảo dữ liệu được hiện ra chính xác
  //_Lưu ý khi đã có value thì cần thêm hàm onChange(bắt buộc) để khi dữ
  //liệu thay đổi thì nó render ra cùng lúc
  const [name, setName] = useState<string>('')

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    //_Lấy value hiện tại của ô input
    const { value } = event.target
    //_setState lại
    setName(value)
  }

  return (
    <div className='mb-2'>
      <h1 className={`${styles.title} mb-2`}>To do list typescript</h1>
      <form className={styles.form}>
        <input
          type='text' //
          placeholder='caption goes here'
          value={name}
          onChange={onChangeInput}
        />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}

export default TaskInput
