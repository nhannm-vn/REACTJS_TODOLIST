import { useState } from 'react'
import { TaskInputProps } from '../../@types/props.types'
import styles from './taskInput.module.scss'
function TaskInput(props: TaskInputProps) {
  //_tạo state name để có chỗ mà lưu trữ giá trị của
  //value ô input cũng như đảm bảo dữ liệu được hiện ra chính xác
  //_Lưu ý khi đã có value thì cần thêm hàm onChange(bắt buộc) để khi dữ
  //liệu thay đổi thì nó render ra cùng lúc
  const [name, setName] = useState<string>('')

  const { addTodo } = props

  //_hàm bắt sự kiện khi bấm submit thì chạy hàm addTodo nhằm thêm sản phẩm vào
  //todos. Đây là sự kiện của toàn form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //_Ngặn chặn load lại trang
    event.preventDefault()
    //_Chạy hàm addTodo
    //nhờ vào việc mình lưu value input vào trong state nên mình có thể lấy
    //ra để xài lúc này
    addTodo(name)
    //_Sau khi add xong thì setName lại '' để cho cái ô hiện thị nó được trống
    setName('')
  }

  //_hàm giúp đồng bộ value cho ô input
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    //_Lấy value hiện tại của ô input
    const { value } = event.target
    //_setState lại
    setName(value)
  }

  return (
    <div className='mb-2'>
      <h1 className={`${styles.title} mb-2`}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
