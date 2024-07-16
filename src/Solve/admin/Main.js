import {useEffect, useState} from "react";
import axios from "axios";

const Main = () => {

  const [data, setData] = useState({}) // gist state 저장
  const [edit, setEdit] = useState(false) // 수정 상태
  const [add,setAdd] = useState(false) // 내용 추가 상태

  const [newItem, setNewItem] = useState({
    image: "",
    word: "",
    category: "",
  }) // 새로운 image / word / category 객체임



  axios.defaults.headers.common['Authorization'] = `token ${process.env.REACT_APP_GITHUB_TOKEN}`;

  // github gist
  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await axios.get(`https://api.github.com/gists/${process.env.REACT_APP_GIST_ID}`);
        setData(JSON.parse(response.data.files[process.env.REACT_APP_GIST_SOLVE].content))
      } catch (error) {
        // 글로벌 에러 세팅
        console.error('Error fetching the Gist:', error);
      }
    };

    fetchGist();
  }, []);
  const updateGist = async (updateData) => {
    console.log(JSON.stringify(data, null, 2))
    try {
      const response = await axios.patch(
        `https://api.github.com/gists/${process.env.REACT_APP_GIST_ID}`,
        {
          files: {
            [process.env.REACT_APP_GIST_SOLVE]: {
              content: JSON.stringify(updateData, null, 2),
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




  // 내용 추가 하기 버튼 누르면
  const handleAddList = () => {
    setAdd(true)
  }

  // 닫기버튼 누르면
  const handleClose = () => {
    setAdd(false)
  }

  // 추가하기 버튼 누르면
  const handleAddItem = () => {

    const newData = {
      image: newItem.image,
      word: newItem.word,
      category: newItem.category
    }

    // clone 에 solveList[0] 에 기존에 데이터대신에 newData 를 추가를 해야함... 어떻게 해야할까 이거는


    const newSolveList = data.solveList[0] && data.solveList ? [...data.solveList[0], newData] : [newData]

    const newDataState = {
      ...data,
      solveList: [newSolveList]
    }

    setData(newDataState)

    updateGist(newDataState);

    setNewItem({
      image: "",
      word: "",
      category:"",
    })

    setAdd(false)


  }


  return (
    <div>
      <div>
        <div>주제 리스트</div>
        <ul>
          {
            data.categories && data.categories.map((cate, idx) => (
              <li key={idx}>{cate}</li>
            ))
          }

        </ul>
      </div>

      <button onClick={handleAddList}>내용 추가하기</button>
      <ul className='solve_ul'>
        {
          add &&
          <li className='solve_li'>
            <button className='solve_delete' onClick={handleClose}>X</button>
            <div className='solve_list_inner'>
              <div>
                <div className='solve_title'>이미지</div>
                <input type="text" placeholder='이미지 url' value={newItem.image}
                  onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                />
              </div>
              <div>
                <div className="solve_title">텍스트</div>
                <input type="text" placeholder="텍스트" value={newItem.word}
                  onChange={(e) => setNewItem({...newItem, word: e.target.value})}
                />
              </div>
              <div>
                <div className="solve_title">카테고리</div>
                <input type="text" placeholder="카테고리" value={newItem.category}
                 onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                />
              </div>
              <button className='solve_edit' onClick={handleAddItem}>추가하기</button>

            </div>
          </li>
        }
        {
          data.solveList && data.solveList[0].map((item, idx) => (
            <li className='solve_li' key={idx}>
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