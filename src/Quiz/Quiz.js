import axios from "axios";
import {useEffect, useState} from "react";
import {xmlToJson} from "../utils/util";

const Quiz = () => {




  // totalItems: number; // 데이터의 총 개수 300개
  // itemCountPerPage: number; // 페이지 당 보여줄 데이터 개수  10개씩
  // pageCount: number; // 보여줄 페이지 개수 5개
  // currentPage: number; // 현재 페이지



  const [data, setData] = useState(false)
  const [search, setSearch] = useState('')

  const [page, setPage] = useState(1) // 현재의 페이지 번호
  const [totalPage, setTotalPage] = useState('') // 총 페이지 수
  const itemPerPage = 10;

  const currentPage = Math.ceil((page / 5)) // 화면에 보여질 페이지의 개수

  const firstGroup = 5 * (currentPage-1); // 화면에 보여질 페이지의 첫번째 번호 1, 6, 11 ...
  const totalPageCount = Math.ceil(totalPage / itemPerPage); // 전체 페이지 개수


  // 130/10 13
  // total/itemPerPage


  const getData = async () => {
    try {
      const res = await axios.get('https://krdict.korean.go.kr/api/search', {
        params: {
          key: process.env.REACT_APP_API_KEY,
          q: search,
          part: 'word',
          sort: 'dict',
          start:page ,
          // total: '검색된 전체 어휘 개수',// 그냥 예는 검색 결과 총량임
          // start :'검색 결과 시작 번호', // 100개 다음 10개이상을 가져올 때 쓸꺼임
          num:itemPerPage, // 검색 결과로 제공하는 어휘 개수

          // translated: "y",
          // trans_lang: "0,1,2",
        }
      })


      let XmlNode = new DOMParser().parseFromString(res.data, "text/xml");
      xmlToJson(XmlNode).channel.item ?
        setData(xmlToJson(XmlNode).channel.item):setData([])

      setTotalPage(xmlToJson(XmlNode).channel.total)

    } catch(e) {
      console.error(e)
    }
  }

  useEffect(()=> {
    getData()
  },[page])


  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSearchClick = () => {
    setPage(1)
    getData()
  }




  return (
    <div>
      <div>
        <div>검색어</div>
        <input type="text" value={search} onChange={handleChange}/>
        <button onClick={handleSearchClick}>검색</button>
      </div>
      {!data ? <div></div> : data && data.length > 0 ? (
        data.map((item ,idx) => {
          return (
            <div>{item.word}</div>
          )
        })
      ) : <div>결과가 없습니다.</div>
      }

      {
        data.length > 0 &&
        <div>
          <button
            onClick={()=> setPage(1)}
          >처음</button>
          <button
            onClick={()=> {
              if(page>1) {
                setPage(page-1)
              }
            }}
          >
            이전</button>
          {
            Array.from({ length: Math.min(5, totalPageCount - firstGroup) }, (v, i) => {
              return (
                <button
                  style={{
                    background:(firstGroup + i +1)===page ? 'red':'white'
                  }}
                  onClick={()=> setPage(firstGroup + i + 1)}
                >
                  {firstGroup + i + 1 }
                </button>
              )

            })
          }
          <button onClick={() => setPage(page +1)}>다음</button>
          <button
            onClick={()=> setPage(Math.ceil(totalPage/itemPerPage))}
          >끝</button>
        </div>

      }
    </div>
  )

}

export default Quiz






