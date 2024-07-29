import '../assets/styles/HeaderDropdown.css';
import { useState } from "react";

const HeaderDropdown = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className='header_wrap'>
      <header className="header">
        <div className="container">
          <h1 className="logo">로고</h1>
          <nav className="nav">
            <ul className="gnb_dep1_ul">
              <li
                className="gnb_dep1_li"
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#">공부</a>
                <ul className={`gnb_dep2_ul ${hoveredIndex === 0 ? 'show' : ''}`}>
                  <li className="gnb_dep2_li">
                    <a href="#">트럭타기</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">공수부대</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">립밤 바르기</a>
                  </li>
                </ul>
              </li>

              <li
                className="gnb_dep1_li"
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#">볼캡</a>
                <ul className={`gnb_dep2_ul ${hoveredIndex === 1 ? 'show' : ''}`}>
                  <li className="gnb_dep2_li">
                    <a href="#">뉴발란스</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">손톱</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">친선전</a>
                  </li>
                </ul>
              </li>

              <li
                className="gnb_dep1_li"
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#">달력</a>
                <ul className={`gnb_dep2_ul ${hoveredIndex === 2 ? 'show' : ''}`}>
                  <li className="gnb_dep2_li">
                    <a href="#">탕비실</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">가르마펌</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">번지</a>
                  </li>
                </ul>
              </li>

              <li
                className="gnb_dep1_li"
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#">에어컨</a>
                <ul className={`gnb_dep2_ul ${hoveredIndex === 3 ? 'show' : ''}`}>
                  <li className="gnb_dep2_li">
                    <a href="#">노트북</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">기름종이</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">행보관</a>
                  </li>
                </ul>
              </li>

              <li
                className="gnb_dep1_li"
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#">심사</a>
                <ul className={`gnb_dep2_ul ${hoveredIndex === 4 ? 'show' : ''}`}>
                  <li className="gnb_dep2_li">
                    <a href="#">비</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">우산</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">크롬</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div className="util">util</div>
        </div>
      </header>
    </div>
  );
};

export default HeaderDropdown;
