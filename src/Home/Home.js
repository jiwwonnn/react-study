import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>개발 공부 프로젝트</h1>
      <ul>
        <li>
          <Link to='/TodoList'>투두 리스트</Link>
        </li>
        <li>
          <Link to='/Quiz'>한국어 퀴즈</Link>
        </li>
        <li>
          <Link to='/Solve'>문제 맞추기</Link>
        </li>
        <li>
          <Link to='/HeaderDropdown'>헤더 드롭다운</Link>
        </li>
        <li>
          <Link to='/Tab'>탭 스타일</Link>
        </li>
        <li>
          <Link to='/Mbti'>Mbti</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home