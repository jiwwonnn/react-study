import '../assets/styles/HeaderDropdown.css'
import {useState} from "react";

const HeaderDropdown = () => {


  const [isHover, setIsHover] = useState(false)

  const handleMouseOver = () => {
    setIsHover(true)
  }

  return (
    <div className='header_wrap'>
      <header className="header">
        <div className="container">
          <h1 className="logo">로고</h1>
          <nav className="nav">
            <ul className="gnb_dep1_ul">
              <li className="gnb_dep1_li">
                <a href="#">메뉴1</a>
                <ul className="gnb_dep2_ul">
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브1</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브2</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브3</a>
                  </li>
                </ul>
              </li>

              <li className="gnb_dep1_li">
                <a href="#">메뉴2</a>
                <ul className="gnb_dep2_ul">
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브1</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브2</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브3</a>
                  </li>
                </ul>
              </li>

              <li className="gnb_dep1_li">
                <a href="#">메뉴3</a>
                <ul className="gnb_dep2_ul">
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브1</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브2</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브3</a>
                  </li>
                </ul>
              </li>

              <li className="gnb_dep1_li">
                <a href="#">메뉴4</a>
                <ul className="gnb_dep2_ul">
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브1</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브2</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브3</a>
                  </li>
                </ul>
              </li>

              <li className="gnb_dep1_li">
                <a href="#">메뉴5</a>
                <ul className="gnb_dep2_ul">
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브1</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브2</a>
                  </li>
                  <li className="gnb_dep2_li">
                    <a href="#">메뉴1 - 서브3</a>
                  </li>
                </ul>
              </li>

            </ul>
          </nav>
          <div className="util">util</div>
        </div>
      </header>

    </div>
  )
}

export default HeaderDropdown