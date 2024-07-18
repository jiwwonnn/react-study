import {useEffect, useState} from "react";
import axios from "axios";

const Main = () => {

  const [data, setData] = useState({}) // gist state 저장
  const [edit, setEdit] = useState(false) // 수정 상태
  const [add,setAdd] = useState(false) // 내용 추가 상태
  const [filterCategory, setFilterCategory] = useState('')

  const [editIndex, setEditIndex] = useState(null)

  const [newItem, setNewItem] = useState({
    image: "",
    word: "",
    category: "",
  }) // 새로운 image / word / category 객체임

  const [newEditItem, setNewEditItem] = useState({
    image: "",
    word: "",
    category: ""
  })



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

  // 내용추가 닫기버튼 누르면
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



  // 리스트에서 삭제 버튼
  const handleDelete = (id) => {
    const bb = data.solveList[0].filter((item, idx) => idx !== id)


    const deleteDataState = {
      ...data,
      solveList : [bb],
    }

    setData(deleteDataState)
    updateGist(deleteDataState)


  }

  // 리스트에서 수정하기 버튼
  const handleEdit = (idx) => {

    // edit 상태로 변경된다.
    setEditIndex(idx)

    setNewEditItem({
      image: data.solveList[0][idx].image,
      word:data.solveList[0][idx].word,
      category:data.solveList[0][idx].category
    })
  }

  // 수정완료버튼을 누르면
  // 내가 수정한 텍스트들의 내용으로 리스트에 내용이 변경된다.



  const handleEditCancel = () => {
    setEditIndex(null)
  }


  const handleCateItemList = (cate) => {
    setFilterCategory(cate)
  }



  const filterCateList = filterCategory
    ? (data.solveList && data.solveList[0] ? data.solveList[0].filter((item) => item.category === filterCategory) : [])
    : (data.solveList && data.solveList[0] ? data.solveList[0] : []);

  console.log(filterCateList , "카테고리랑 동일한 리스트를 찾아보기.")






  return (
    <div className='admin_wrap'>
      <div>
        <div>카테고리</div>
        <ul className="cate_ul">
          {/*전체 li가 저 map 돌리는함수 나오는 속도랑 비슷하게는 못하나 ?*/}
          <li onClick={() => handleCateItemList("")}>전체</li>
          {
            data.solveList && data.solveList[0] && [...new Set(data.solveList[0].map(item => item.category))].map((cate, idx) => (
              <li key={idx} onClick={() => handleCateItemList(cate)}>{cate}</li>
            ))
          }

        </ul>
      </div>

      <button
        className="add_btn"
        onClick={handleAddList}>내용 추가하기</button>
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
          filterCateList.map((item, idx) => (
            editIndex === idx ? (
              <li className='solve_li' key={idx}>
                <div className='solve_list_inner'>
                  <div>
                    <div className='solve_title'>이미지</div>
                    <input type="text" placeholder='이미지 url' value={item.image}/>
                  </div>
                  <div>
                    <div className="solve_title">텍스트</div>
                    <input type="text" placeholder="텍스트" value={item.word}/>
                  </div>
                  <div>
                    <div className="solve_title">카테고리</div>
                    <input type="text" placeholder="카테고리" value={item.category}/>
                  </div>
                  <button className='solve_edit' onClick={() => handleEdit}>수정완료</button>
                  <button onClick={handleEditCancel}>수정 취소</button>

                </div>
              </li>
            ) : (
              <li className='solve_li' key={idx}>
                {/*{filterCateList.length > 20 && (*/}
                {/*  <button className='solve_delete' onClick={() => handleDelete(idx)}>X</button>*/}
                {/*)}*/}
                <button className='solve_delete' onClick={() => handleDelete(idx)}>X</button>
                <div className='solve_list_inner'>
                  <div className="solve_number">{idx+1}번</div>
                  <div>
                    <div className='solve_title'>이미지</div>
                    <div className="solve_img_wrap">
                      <img src={item.image} alt="이미지"/>
                    </div>
                  </div>
                  <div>
                    <div className="solve_title">텍스트</div>
                    <div>{item.word}</div>
                  </div>
                  <div>
                    <div className="solve_title">카테고리</div>
                    <div>{item.category}</div>
                  </div>
                  <button className='solve_edit' onClick={() => handleEdit(idx)}>수정하기</button>

                </div>
              </li>
            )
          ))
        }

      </ul>


    </div>
  )
}

export default Main