import {Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Quiz from "./Quiz/Quiz";
import TodoList from "./TodoList/TodoList";
import Solve from "./Solve/Solve";

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />}></Route>
      <Route path='/TodoList' element={<TodoList />}></Route>
      <Route path='/Quiz' element={<Quiz />}></Route>
      <Route path='/Solve' element={<Solve />}></Route>
    </Routes>
  )
}

export default App