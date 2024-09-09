import { useState } from "react";
import '../assets/styles/TodoList.css'

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState('');
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState("all");

  const handleAllCheckbox = () => {
    const allChecked = todoList.every(item => item.checked);
    setTodoList(todoList.map(item => ({ ...item, checked: !allChecked })));
  };

  const handleChange = (e) => setTodo(e.target.value);

  const handleSubmit = () => {
    if (todo.trim()) {
      setTodoList([...todoList, {
        id: Date.now(),
        text: todo,
        checked: false,
        isEdit: false
      }]);
      setTodo('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleListDelete = (id) => {
    setTodoList(todoList.filter(item => item.id !== id));
  };

  const listCheckedToggle = (id) => {
    setTodoList(todoList.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleEdit = (id, text) => {
    setEditText(text);
    setTodoList(todoList.map(item =>
      item.id === id ? { ...item, isEdit: true } : item
    ));
  };

  const handleEditChange = (e) => setEditText(e.target.value);

  const handleEditSubmit = (id) => {
    setTodoList(todoList.map(item =>
      item.id === id ? { ...item, text: editText, isEdit: false } : item
    ));
    setEditText('');
  };

  const clearCompletedDelete = () => {
    setTodoList(todoList.filter(item => !item.checked));
  };

  const filteredList = () => {
    switch (filter) {
      case "completed":
        return todoList.filter(item => item.checked);
      case "not":
        return todoList.filter(item => !item.checked);
      default:
        return todoList;
    }
  };

  return (
    <div className='all'>
      <input
        type="text"
        placeholder='할 일을 입력하세요.'
        value={todo}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className='text_input'
      />

      {todoList.length > 0 && (
        <div className='top'>
          <input
            type="checkbox"
            onClick={handleAllCheckbox}
            checked={todoList.length && todoList.every(item => item.checked)}
            id="check01"
          />
          <label htmlFor='check01'></label>
          전체선택
        </div>
      )}

      <div>
        {filteredList().map((item) => (
          <div className='mid' key={item.id}>
            <input
              type="checkbox"
              onClick={() => listCheckedToggle(item.id)}
              checked={item.checked}
              id={`check-${item.id}`}
            />
            <label htmlFor={`check-${item.id}`}></label>

            {item.isEdit ? (
              <div className="edit">
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                />
                <button onClick={() => handleEditSubmit(item.id)}>수정완료</button>
              </div>
            ) : (
              <div
                className={item.checked ? 'checked' : 'text'}
                onClick={() => handleEdit(item.id, item.text)}
              >
                {item.text}
              </div>
            )}
            <button onClick={() => handleListDelete(item.id)}>삭제</button>
          </div>
        ))}
      </div>

      <div className='bot'>
        <div>
          {todoList.filter(item => !item.checked).length} items left
        </div>
        <div className="button_list">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("not")}>Not Completed</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
        <button onClick={clearCompletedDelete}>Clear Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
