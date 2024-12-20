import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'
import { HandleNewTodos } from '../../@types/handle.type'

//_func nhận vào callback và thực hiện các item theo chức năng đó
//và sau đó lấy dữ liệu từ localStorage xuống sau đó biến tấu và đẩy lên lại
const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  //_Lấy danh sách từ localStorage xuống
  const todosString = localStorage.getItem('todos')
  //_Biến đổi thành mảng chứa các object hoặc nếu lấy về là null thì đưa về thành []
  const todosObj = JSON.parse(todosString || '[]')
  //_Biến đổi bằng cái hàm nhận vào
  const newTodosObj = handleNewTodos(todosObj)
  //_Kết quả được cái mảng mới và update lên localStorage
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

function Todolist() {
  //_Tạo state
  //_State chuyên lưu danh sách các todo
  const [todos, setTodos] = useState<Todo[]>([])

  //_Thằng này sẽ truyền vào component TaskInput
  //nếu là null thì mình đang ở chế độ add còn nếu khác null thì là chế độ edit
  //và ban đầu mặc định nó sẽ là null
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  //_Tạo cái biến để filter các giá trị trong todos
  //_Ở đây sẽ có 2 list dành cho hoàn thành và chưa hoàn thành
  const doneTodos = todos.filter((todo) => todo.done)
  const notdoneTodos = todos.filter((todo) => !todo.done)

  //_Chúng ta muốn render web mà không mất dữ liệu
  //thì chúng ta sẽ xài useEffect để set dữ liệu từ trong local cho state todos
  //*Kết luận: flow => biến đổi trên UI xong và lưu sự biến đổi đó vào local
  //để khi render ra lại thì đem cái biến đổi đó bỏ vào trong các state để hiện thị ra
  //nghĩa là biến đổi gì thì cũng đồng bộ với local để khi render ra lấy từ local ra đúng chuẩn
  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    //set todos lại
    setTodos(todosObj)
  }, [])

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
    const handler = (todoArr: Todo[]) => {
      return [...todoArr, todo]
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }

  //_Method này giúp cho mình khi tick vào cái ô check
  //thì nó sẽ hiển thị trạng thái check chưa để render ra
  //nghĩa là nó sẽ set lại thuộc tính done của phần tử todo bị click
  //method này cần truyền vào id để định danh và thêm trạng thái định danh
  const handleDoneTodo = (id: string, done: boolean) => {
    const handler = (todoArr: Todo[]) => {
      return todoArr.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done
          }
        } else {
          return todo
        }
      })
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }

  //_method này giúp khi chúng ta click vào cây bút thì nó
  //sẽ biết được là đang muốn edit và thằng nào bị edit thì sẽ lưu thằng đó vào currentTodod
  //mà muốn biết và lưu thì mình cần id định danh
  const startEditTodo = (id: string) => {
    //_tìm ra thằng đó trước tiên
    const finedTodo = todos.find((todo) => todo.id === id)
    //_sau khi tìm ra thì set cho currentTodo thằng mới được tìm ra
    //_*Lưu ý ở đây nó có thể báo lỗi vì currentTodo đang có dạng là Todo | null
    //mà findedTodo thì có thể là Todo | undefinded nên mình cần as để trấn an nó hoặc cần thêm cái if
    if (finedTodo) {
      setCurrentTodo(finedTodo as Todo)
    }
  }

  //_sau khi bấm cây bút rồi thì bắt đầu gõ phím
  //và edit nội dung. Chính vì vậy mà nó sẽ set cái name của
  //currentTodo lại. Nghĩa là lấy nội dung ở trạng thái edit và set lại
  //cho currentTodo
  //_Lưu ý code mấy cái này sợ null lắm. Nên cần check coi thử bản thân thằng currentTodo có giá
  //trị hay không, nếu như null nghĩa là trạng thái add thì không có set làm gì
  const editTodo = (name: string) => {
    setCurrentTodo((prevState) => {
      //nếu như có
      if (prevState) {
        return {
          ...prevState,
          name
        }
      } else {
        //nếu như không có thì trả ra null(trạng thái cũ nghĩa là đang add) coi như không có gì
        return null
      }
    })
  }

  //_trong trạng thái edit thì
  //_method này giúp ta duyệt lần lượt qua các todo con trong list và xem
  //thử coi todo con nào có id giống với id của currentTodo thì mình sẽ cập nhật
  //cập nhật thằng currentTodo đè lên thằng todo có id giống nó
  //==> mục đích là để cập nhật lại list danh sách và hiển thị ra
  const finishEditTodo = () => {
    const handler = (todoArr: Todo[]) => {
      return todoArr.map((todo) => {
        //_Lưu ý vì currentTodo có thể null nên
        //cần optional chain để tránh crash app. Khi có null thì nó sẽ lập tức thành undefined
        if (todo.id === currentTodo?.id) return currentTodo
        else return todo
      })
    }
    setTodos(handler)

    //_Và nếu edit rồi thì mình sẽ đưa currentTodo về null nghĩa là quay lại trạng thái add
    //để chuẩn bị cho những lần tiếp theo
    setCurrentTodo(null)
    syncReactToLocal(handler)
  }

  //_Chức năng delete todo
  const deleteTodo = (id: string) => {
    //_Có trường hợp đang bấm edit và lại bấm vào cái nút thùng rác
    //thì khi đó mình sẽ xóa sạch hết nội dung ở trên ô input luôn. Muốn như vậy thì phải set currentTodo về null
    if (currentTodo) {
      setCurrentTodo(null)
    }

    const handler = (todoArr: Todo[]) => {
      const findedIndexTodo = todoArr.findIndex((todo) => todo.id === id)
      //_Nếu như tìm thấy thì mới xóa
      if (findedIndexTodo > -1) {
        //_Lưu ý nên clone prev ra trước khi xóa
        const result = [...todoArr]
        // xóa 1 phần tử từ cị trí tìm thấy
        result.splice(findedIndexTodo, 1)
        return result
      }
      //_Nếu như không tìm thấy thì ta không làm gì cả
      return todoArr
    }

    setTodos(handler)
    syncReactToLocal(handler)
  }

  return (
    <div className={styles.todolist}>
      <div className={styles.todolistContainer}>
        <TaskInput
          addTodo={addTodo} //
          currentTodo={currentTodo}
          editTodo={editTodo}
          finishEditTodo={finishEditTodo}
        />
        <TaskList
          doneTaskList={false} //
          todos={notdoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList={true} //
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}

export default Todolist
