import { useState } from 'react'
import PropTypes from 'prop-types'
import { TaskInputProps } from '../../@types/props.types'
import styles from './taskInput.module.scss'
import { TodoTypes } from '../../PropTypes/todo.proptypes'
function TaskInput(props: TaskInputProps) {
  //_tạo state name để có chỗ mà lưu trữ giá trị của
  //value ô input cũng như đảm bảo dữ liệu được hiện ra chính xác
  //_Lưu ý khi đã có value thì cần thêm hàm onChange(bắt buộc) để khi dữ
  //liệu thay đổi thì nó render ra cùng lúc
  const [name, setName] = useState<string>('')

  const { addTodo, currentTodo, editTodo, finishEditTodo } = props

  //_hàm bắt sự kiện khi bấm submit thì chạy hàm addTodo nhằm thêm sản phẩm vào
  //todos. Đây là sự kiện của toàn form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //_Ngặn chặn load lại trang
    event.preventDefault()

    //_Nếu ở trạng thái edit thì set theo kiểu edit
    if (currentTodo) {
      finishEditTodo()
    } else {
      //_Chạy hàm addTodo
      //nhờ vào việc mình lưu value input vào trong state nên mình có thể lấy
      //ra để xài lúc này
      addTodo(name)
      //_Sau khi add xong thì setName lại '' để cho cái ô hiện thị nó được trống
      setName('')
    }
  }

  //_hàm giúp đồng bộ value cho ô input
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    //_Lấy value hiện tại của ô input
    const { value } = event.target

    //_Nếu như có currentTodo nghĩa là đang muốn edit thì khi
    //onChange sẽ thay đổi đồng thời giá trị name cho currentTodo từ đó có thể
    //render ra lại trên ô input ==> nhờ như vậy khi bấm nút chỉnh nó mởi cho edit trên ô input
    if (currentTodo) {
      editTodo(value)
    } else {
      //_Còn nếu là trạng thái bình thường thì setState name lại thôi
      setName(value)
    }
  }

  return (
    <div className='mb-2'>
      <h1 className={`${styles.title} mb-2`}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text' //
          placeholder='caption goes here'
          // nếu đang ở chế độ edit thì hiển thị name của cái todo đang lưu trong
          //currentTodo ra còn nếu không có gì thì cứ render ra name(value) của ô input
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        {/* tùy thuộc vào edit hay là add mà icon cũng khác nhau */}
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired
}

export default TaskInput
