import {useState} from "react";
import '../assets/styles/TodoList.css'

const TodoList = () => {



  const [todoList, setTodoList] = useState([]) // 투두리스트 배열
  const [todo, setTodo] = useState('') // 투두 입력 내용
  const [edit, setEdit] = useState(false) // 수정 상태
  const [editText, setEditText] = useState('') // 수정 텍스트
  const [filter, setFilter] = useState("all")


  // 전체 체크박스 선택하기
  const handleAllCheckbox = () => {
    let clone = [...todoList]

    if (todoList.every(ele => ele.checked)) {
      clone=clone.map(ele => ({...ele, checked: false}))
    } else {
      clone=clone.map(ele => ({...ele, checked: true}))
    }
    console.log(clone)
    setTodoList(clone)
  }



  // input 에 value 값 넣기
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  // input에 checked, id, text 추가하고 todoList 배열에 추가하기
  // 입력 다 했으면 input 은 초기화하기
  const handleSubmit = () => {
    const newTodoItem = {
      id : Date.now(),
      text: todo,
      checked : false,
      isEdit: false,
    }

    setTodoList([...todoList, newTodoItem])
    setTodo('')

  }

  // 엔터키 누르면 내용이 추가가 되게 해야함.
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleSubmit()
    }
  }

  // 리스트에서 닫기버튼 누르면 리스트에서 삭제 되어야함
  const handleListDelete = (id) => {
    // x버튼을 누른 아이템이 아닌것들만 모아서 필터링함 > 새로운 배열을 만듬.
    setTodoList(todoList.filter((item) => item.id !== id))
  }

  // 리스트에서 체크박스 누르면 할일을 완료 한거임.
  const listCheckedToggle = (id) => {
    setTodoList(todoList.map((item) => item.id === id ? {...item, checked: !item.checked } : item))
  }

  // 할일을 클릭하면 수정상태로 변경.
  const handleEdit = (id, text) => {
    setEditText(text)
    setTodoList(todoList.map((item) => item.id === id ? { ...item , isEdit: true} : item))
  }

  // 수정 input value
  const handleEditChange = (e) => {
    setEditText(e.target.value)
  }

  // 수정 버튼을 눌렀을때
  const handleEditSubmit = (id) => {
    setTodoList(
      todoList.map((item)=> item.id === id ? {...item, text: editText, isEdit: false} : item)
    )
    setEditText('');
  }

  // 체크표시한 개수를 확인하는 방법 ...
  const countCheckedFilter = () => {
    return todoList.filter((item) => item.checked).length
  }


  // 완료된거 삭제하기
  const clearCompletedDelete = () => {
    setTodoList(todoList.filter((item) => !item.checked))
  }


  // 은지님 도움받은 코드
  const getList = (type="all") => {
    const list = type === "all" ? todoList : type === "not" ? todoList.filter((item) => !item.checked && item) : type === "completed" ? todoList.filter((item) => item.checked && item) : todoList.filter((item) => !item.checked && item)
    return (
      list.map((item , idx) => (
        <div className='mid' key={item.id}>
          <input type="checkbox" onClick={() => listCheckedToggle(item.id)} checked={item.checked}/>
          {
            item.isEdit ?
              (
                <div>
                  <input type="text" value={editText} onChange={handleEditChange}/>
                  <button onClick={() => handleEditSubmit(item.id)}>수정완료</button>
                </div>
              ) :
              (
                <div className={item.checked ? 'checked' : ""} onClick={() => handleEdit(item.id, item.text)}>{item.text}</div>
              )

          }
          <div><button onClick={() => handleListDelete(item.id)}>삭제</button></div>
        </div>
      ))
    )
  }


  return (
    <div className='all'>
      <div className={'top'}>
        {/*여기 input checkbox 누르면 모든 할일이 완료된 상태로 변경되게만 작업해보기*/}
        <input type="checkbox" onClick={handleAllCheckbox} checked={todoList.length && todoList.every(ele =>  ele.checked)}/>
        <input type="text" placeholder='입력' value={todo} onChange={handleChange} onKeyPress={handleKeyPress}/>
      </div>
      <div>
        {getList(filter)}
      </div>


      <div className='bot'>
        {/*남은 항목 개수 */}
        <div>
          {countCheckedFilter()} items left
        </div>
        <div>
          {/*전체 확인하기*/}
          <button onClick={() => setFilter("all")} >all</button>
          {/*진행중 확인하기*/}
          <button
            // onClick={() => todoNotItem()}
            onClick={() => setFilter("not")}
          >not</button>
          {/*종료 확인하기*/}
          <button onClick={() => setFilter("completed")} >completed</button>
        </div>
        {/*완료된거만 삭제하기*/}
        <button onClick={clearCompletedDelete}>clear completed</button>
      </div>

      <div className='botbot'>할 일 클릭시 수정 가능</div>
    </div>
  )
}

export default TodoList