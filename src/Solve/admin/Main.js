import {useEffect, useState} from "react";
import axios from "axios";

const Main = () => {

  const [data, setData] = useState({})


  // github gist
  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await axios.get(`https://api.github.com/gists/${process.env.REACT_APP_GIST_ID}`);
        console.log(JSON.parse(response.data.files[process.env.REACT_APP_GIST_SOLVE].content))
        setData(JSON.parse(response.data.files[process.env.REACT_APP_GIST_SOLVE].content))
      } catch (error) {
        // 글로벌 에러 세팅
        console.error('Error fetching the Gist:', error);
      }
    };

    fetchGist();
  }, []);



  const updateGist = async () => {
    console.log(JSON.stringify(data, null, 2))
    try {
      const response = await axios.patch(
        `https://api.github.com/gists/${process.env.REACT_APP_GIST_ID}`,
        {
          files: {
            [process.env.REACT_APP_GIST_SOLVE]: {
              content: JSON.stringify(data, null, 2),
            },
          },
        },
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      );
      console.log('Gist updated:', response.data);
    } catch (error) {
      console.error('Error updating the Gist:', error);
    }
  };


  return (
    <div>
      <div>
        <div>주제 리스트</div>
        <ul>
          {
            data.categories && data.categories.map((cate, idx) => (
              <li>{cate}</li>
            ))
          }

        </ul>
      </div>

      <ul className='solve_ul'>
        {
          data.solveList && data.solveList[0].map((item, idx) => (
            <li className='solve_li'>
              {/*삭제버튼은 21개부터 생김 20개일때는 닫기버튼이 안생겨야함*/}
              <button className='solve_delete'>X</button>
              <div className='solve_list_inner'>
                <div className="solve_number">{idx+1}번</div>
                <div>
                  <div className='solve_title'>이미지</div>
                  <div className="solve_img_wrap">
                    <img src={item.image} alt="이미지"/>
                  </div>
                  {/*<input type="text" placeholder='이미지 url' value={item.image}/>*/}
                </div>
                <div>
                  <div className="solve_title">텍스트</div>
                  <div>{item.word}</div>
                  {/*<input type="text" placeholder="텍스트" value={item.word}/>*/}
                </div>
                <div>
                  <div className="solve_title">카테고리</div>
                  <div>{item.category}</div>
                  {/*<input type="text" placeholder="카테고리" value={item.category}/>*/}
                </div>
                <button className='solve_edit'>수정하기</button>

              </div>
            </li>
          ))
        }

      </ul>

      
    </div>
  )
}

export default Main