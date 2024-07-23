import { solveList } from "../utils/solveList";
import { useEffect, useState } from "react";
import '../assets/styles/Solve.css';
import axios from "axios";

const Solve = () => {
  const [data, setData] = useState({})

  const [questionList, setQuestionList] = useState([]); // 질문 배열
  const [currentNumber, setCurrentNumber] = useState(0); // 현재 문제 번호
  const [score, setScore] = useState(0); // 맞춘 개수
  const [start, setStart] = useState(true); // 시작
  const [result, setResult] = useState(false); // 결과 화면
  const [popup, setPopup] = useState(false); // 팝업 상태
  const [popupMessage, setPopupMessage] = useState(''); // 팝업 텍스트
  const [shuffleAnswerList, setShuffleAnswerList] = useState([]); // 정답 리스트
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리
  const [buttonList, setButtonList] = useState([]);
  const currentQuestion = questionList[currentNumber]; // 현재 질문



  const startQuiz = (category) => {
    setSelectedCategory(category);

    const randomQuestion = data.filter(item => item.category === category).sort(() => 0.5 - Math.random());
    setQuestionList(randomQuestion);
    setStart(false);
    setScore(0);
    setCurrentNumber(0);
  };

  const reStartQuiz = () => {
    setQuestionList([]);
    setCurrentNumber(0);
    setScore(0);
    setStart(true);
    setResult(false);
  };

  const handleAnswerClick = (idx) => {
    const correct = shuffleAnswerList[idx] === currentQuestion.word;

    setPopupMessage(correct ? '정답입니다!' : '오답입니다!');
    setPopup(true);

    if (correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setPopup(false);
      setCurrentNumber(prev => prev + 1);

      if (currentNumber + 1 >= 10) {
        setResult(true);
      }
    }, 800);
  };

  const handleSetButtonList = () => {
    const uniqueNames = new Map();
    data.forEach(item => {
      if (!uniqueNames.has(item.category)) {
        uniqueNames.set(item.category, { category: item.category, ko: item.ko });
      }
    });
    const result = Array.from(uniqueNames.values());
    setButtonList(result);
  }


  useEffect(() => {
    (data.length > 0) && handleSetButtonList();
  }, [data])


  // github gist
  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await axios.get(`https://api.github.com/gists/${process.env.REACT_APP_GIST_ID}`);
        const data = JSON.parse(response.data.files[process.env.REACT_APP_GIST_SOLVE].content);
        if(data.solveList?.length > 0) {
          setData(data.solveList[0]);
        }
      } catch (error) {
        // 글로벌 에러 세팅
        console.error('Error fetching the Gist:', error);
      }
    };

    fetchGist();
  }, []);


  useEffect(() => {
    if (currentQuestion) {
      const clone = [...questionList];
      const filteredList = clone.filter(item => item.word !== currentQuestion.word);
      const shuffledList = filteredList.sort(() => 0.5 - Math.random()).slice(0, 3).map(item => item.word);
      const answerList = [...shuffledList, currentQuestion.word].sort(() => 0.5 - Math.random());
      setShuffleAnswerList(answerList);
    }
  }, [currentNumber, questionList]);

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





  console.log("DATA", data)


  return (
    <div className='wrap'>
      {result ? (
        <div className='result'>
          <div>
            10문제 중 <span className='number'>{score}</span>문제 맞췄습니다.
          </div>
          <button onClick={reStartQuiz}>문제 다시 풀기</button>
        </div>
      ) : (
        <div>
          {start ? (
            <div className='start_quiz'>
              <div className="button_list">
                {
                  // uniqueKoValues && uniqueKoValues.map((ko, idx) => (
                  //   ko && <button key={idx} onClick={() => startQuiz(ko)}>{ko} 퀴즈 풀기</button>
                  // ))
                  buttonList?.map((item, idx) => (
                    item && <button key={idx} onClick={() => startQuiz(item.category)}>{item.ko} 퀴즈 풀기</button>
                  ))
                }
              </div>
            </div>

          ) : (
            <div className='content'>
              <div className='content_inner'>
                <div className='numberling'>
                  <span className='current_number'>{currentNumber + 1}</span> / 10
                </div>

                {/* word / image */}
                {currentQuestion && (
                  <div>
                    <img src={currentQuestion.image} alt='image' className='img_wrap' />

                    <div className='btn_list'>
                      {shuffleAnswerList.map((item, idx) => (
                        <button onClick={() => handleAnswerClick(idx)} key={idx}>{item}</button>
                      ))}
                    </div>

                    {popup && (
                      <div className='popup_wrap'>
                        <div className='popup'>
                          <div>{popupMessage}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Solve;
