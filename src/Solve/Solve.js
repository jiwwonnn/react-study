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

  const currentQuestion = questionList[currentNumber]; // 현재 질문

  useEffect(() => {
    if (currentQuestion) {
      const clone = [...solveList[0]];
      const filteredList = clone.filter(item => item.word !== currentQuestion.word);
      const shuffledList = filteredList.sort(() => 0.5 - Math.random()).slice(0, 3).map(item => item.word);
      const answerList = [...shuffledList, currentQuestion.word].sort(() => 0.5 - Math.random());
      setShuffleAnswerList(answerList);
    }
  }, [currentNumber, questionList]);

  const startQuiz = () => {
    const randomQuestion = [...solveList[0]].sort(() => 0.5 - Math.random());
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






  // github gist
  // useEffect(() => {
  //   const fetchGist = async () => {
  //     try {
  //       const response = await axios.get(`https://api.github.com/gists/${process.env.REACT_APP_GIST_ID}`);
  //
  //       console.log(response ,"RESPONSE")
  //       // console.log(JSON.parse(response.data.files[process.env.REACT_APP_GIST_WORD].content))
  //       setData(JSON.parse(response.data.files[process.env.REACT_APP_GIST_WORD].content));
  //     } catch (error) {
  //       // 글로벌 에러 세팅
  //       console.error('Error fetching the Gist:', error);
  //     }
  //   };
  //
  //   fetchGist();
  // }, []);

  // github gist
  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await axios.get(`https://api.github.com/gists/${process.env.REACT_APP_GIST_ID}`);

        console.log(response, "RESPONSE")

      } catch (error) {
        // 글로벌 에러 세팅
        console.error('Error fetching the Gist:', error);
      }
    };

    fetchGist();
  }, []);


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
              <button onClick={startQuiz}>동물 퀴즈 풀기</button>
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
