import {useLocation, useNavigate} from "react-router-dom";
import '../assets/styles/Mbti.css';

import INTJ from '../assets/images/intj.png'

const mbtiDescriptions = {
  INTJ: { title: '전략가', text: '독립적이고 전략적 사고를\n 지닌 혁신가입니다.'},
  INTP: { title: '논리술사', text: '분석적이고 지적 호기심이\n 강한 사색가입니다.' },
  ENTJ: { title: '통솔자', text: '결단력과 리더십을 지닌\n 천성적인 지도자입니다.' },
  ENTP: { title: '변론가', text: '창의적이고 논쟁을 즐기는\n 혁신적인 사고자입니다.' },
  INFJ: { title: '옹호자', text: '이상주의적이고 타인을 돕는 데\n 헌신적인 사람입니다.' },
  INFP: { title: '중재자', text: '감성적이며 공감 능력이 뛰어난\n 평화주의자입니다.' },
  ENFJ: { title: '선도자', text: '카리스마 있고 타인을 이끄는 데\n 능숙한 지도자입니다.' },
  ENFP: { title: '활동가', text: '열정적이고 창의적인 아이디어를\n 추구하는 사람입니다.' },
  ISTJ: { title: '현실주의자', text: '책임감 있고 조직적이며\n 신뢰할 수 있는 사람입니다.' },
  ISFJ: { title: '수호자', text: '헌신적이고 신중하며 타인을 돕는 데\n 열정적인 사람입니다.' },
  ESTJ: { title: '경영자', text: '실용적이고 효율성을 중시하며\n 리더십을 발휘하는 사람입니다.' },
  ESFJ: { title: '집정관', text: '사교적이고 협력적이며 타인을\n 돌보는 데 뛰어난 사람입니다.' },
  ISTP: { title: '장인', text: '독립적이고 문제 해결 능력이\n 뛰어난 실용적인 사람입니다.' },
  ISFP: { title: '모험가', text: '유연하고 창의적이며 예술적 감각이\n 뛰어난 사람입니다.' },
  ESTP: { title: '사업가', text: '모험을 즐기고 즉흥적이며 현실적인\n 사고를 지닌 사람입니다.' },
  ESFP: { title: '연예인', text: '사교적이고 활발하며 즐거움을\n 추구하는 사람입니다.' }
};

const MbtiResult = () => {
  const location = useLocation();
  const { resultMbti } = location.state || {};

  const navigate = useNavigate()

  const handleRetry = () => {
    navigate('/mbti')
  }

  if (!resultMbti) {
    return <div>결과를 찾을 수 없습니다.</div>;
  }

  const description = mbtiDescriptions[resultMbti];

  return (
    <div className="mbti_result_wrap">
      <div className="mbti_result">
        <p className="mbti_title"> {description?.title}</p>
        <h2 className="mbti_type">{resultMbti}</h2>
        <p className="mbti_text">{description?.text}</p>
        <button onClick={handleRetry}>다시 검사하기</button>
      </div>

    </div>
  );
};

export default MbtiResult;
