import {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/Mbti.css'

const Mbti = () => {
  const [page, setPage] = useState(0);
  const [mbti, setMbti] = useState({
    E: 0, I: 0,
    S: 0, N: 0,
    F: 0, T: 0,
    P: 0, J: 0
  });


  const [start, setStart] = useState(false)
  const [result, setResult] = useState(null);
  const navigate = useNavigate();


  const questionList = [
    {
      q: ['주말에 보통 어떻게 시간을 보내나요?'],
      a: [{type: 'I', text: 'A. 혼자 집에서 책을 읽거나 영화 보기'}, {type: 'E', text: 'A. 친구들과 만나서 활동하거나 외출하기'}]
    },
    {
      q: ['새로운 사람들과의 대화가 있을 때 당신은?'],
      a: [{type: 'I', text: 'A. 조금 긴장되고 피곤함을 느낀다'}, {type: 'E', text: 'A. 흥미롭고 에너지를 얻는다'}]
    },
    {
      q: ['혼자만의 시간이 필요한가요?'],
      a: [{type: 'I', text: 'A. 네, 종종 혼자만의 시간이 필요하다'}, {type: 'E', text: 'A. 아니요, 사람들과 함께하는 것이 더 좋다'}]
    },
    {
      q: ['여행을 계획할 때, 당신은 어떤 걸 더 중요하게 생각하나요?'],
      a: [{type: 'S', text: 'A. 여행지의 유명한 관광지와 음식'}, {type: 'N', text: 'A. 여행의 전체적인 경험과 분위기'}]
    },
    {
      q: ['일을 시작할 때 어떤 방식으로 접근하나요?'],
      a: [{type: 'S', text: 'A. 구체적인 단계와 세부 사항을 확인'}, {type: 'N', text: 'A. 전체적인 아이디어와 큰 그림을 먼저 봄'}]
    },
    {
      q: ['문제를 해결할 때, 당신은 어떤 방식으로 접근하나요?'],
      a: [{type: 'S', text: 'A. 현재 상황과 구체적인 정보를 바탕으로 해결'}, {type: 'N', text: 'A. 문제의 본질과 장기적인 해결책을 고민'}]
    },
    {
      q: ['친구가 도움을 필요로 할 때, 당신은?'],
      a: [{type: 'T', text: 'A. 문제를 해결하기 위해 논리적인 조언을 해준다'}, {type: 'F', text: 'A. 친구의 감정을 이해하고 공감해준다'}]
    },
    {q: ['결정을 내릴 때 당신은 어떤 기준을 고려하나요?'], a: [{type: 'T', text: 'A. 사실과 논리적인 분석'}, {type: 'F', text: 'A. 사람들의 감정과 관계'}]},
    {
      q: ['다툼이 있을 때, 당신의 접근 방식은?'],
      a: [{type: 'T', text: 'A. 문제의 논리적인 측면을 해결하려 한다'}, {type: 'F', text: 'A. 서로의 감정을 이해하고 조정하려 한다'}]
    },
    {
      q: ['하루 일정을 정할 때 당신은?'],
      a: [{type: 'P', text: 'A. 대충 계획하고 그때그때 상황에 맞게 조정'}, {type: 'J', text: 'A. 미리 철저히 계획하고 일정을 지키려 한다'}]
    },
    {
      q: ['갑작스러운 변경이 있을 때 당신은?'],
      a: [{type: 'P', text: 'A. 즉흥적으로 대처하고 적응하려 한다'}, {type: 'J', text: 'A. 계획대로 진행되기를 바란다'}]
    },
    {
      q: ['친구와 약속을 잡을 때, 당신은?'],
      a: [{type: 'P', text: 'A. 대충 정해두고 나중에 세부 사항을 맞추는 편'}, {type: 'J', text: 'A. 일정을 정확히 정하고 미리 준비해두는 편'}]
    },
    {q: ['테스트 종료, 결과를 확인하세요.'], a: [{type: '', text: '- 결과 확인하기'}]}
  ];

  const mbticlick = (idx, type) => {
    if (type) {
      setMbti((prev) => ({
        ...prev,
        [type]: prev[type] + 1
      }));
    }
    if (page < questionList.length - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const calculateResult = () => {
    const resultMbti = [
      mbti.E > mbti.I ? 'E' : 'I',
      mbti.S > mbti.N ? 'S' : 'N',
      mbti.F > mbti.T ? 'F' : 'T',
      mbti.P > mbti.J ? 'P' : 'J'
    ].join('');

    navigate('/Mbti/result', {state : {resultMbti}})
  };

  const handleStart = () => {
    setStart(true)
  }


  return (
    <div className='mbti_wrap'>


      <div className="mbti_inner">
        {
          start ? (
            <>
              <div className="mbti_q">
                {page === questionList.length - 1 ? questionList[page].q : `Q. ${questionList[page].q}`}
              </div>
              <div className="mbti_a_wrap">
                {
                  page < questionList.length - 1 ? (
                    questionList[page].a.map((item, idx) => (
                      <div className="mbti_a" onClick={() => mbticlick(idx, item.type)} key={idx}>
                        {item.text}
                      </div>
                    ))
                  ) : (
                    <button onClick={calculateResult} className="mbti_check">결과 확인하기</button>
                  )
                }
              </div>
            </>
          ) : (

            <div className="mbti_start">
              MBTI 테스트를 시작해보세요 !
              <button onClick={handleStart}>시작하기</button>
            </div>
          )
        }


      </div>

    </div>
  );
};

export default Mbti;