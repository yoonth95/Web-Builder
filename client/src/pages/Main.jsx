import React from 'react';
import Nav from 'components/Main/Nav';
import MainCon from 'components/Main/MainCon';
import 'styles/Main/Main.css';

const Main = () => {
  return (
    <>
      <Nav />
      {conList.map((item) => (
        <MainCon item={item} />
      ))}
      <div className='foot'>
        <div className='footList1'>
          <p>무료신청</p>
        </div>
        <div className='footList2'>
          <p>상담신청</p>
        </div>
      </div>
    </>
  );
};

export default Main;

const baseUrl = 'https://cache.wjthinkbig.com/WEB_RESOURCE/WJBOOKCLUB/images/main_v2023/v2023_pd_list_';
const conList = [
  {
    id: 1,
    title: '웅진 씽크빅',
    subtitle: '아이수준에 맞춰 선택과 조합이 가능한 맞춤형 학습지',
    list: [
      { contitle: '스마트 바로쓰기', src: `${baseUrl}00.png` },
      { contitle: '초단기한글', src: `${baseUrl}01.png` },
      { contitle: '놀이로 호기심 꺠치기', src: `${baseUrl}02.png` },
      { contitle: 'AI바로셈', src: `${baseUrl}03.png` },
    ],
  },
  // 스마트올 올백
  {
    id: 2,
    title: '웅진 스마트',
    subtitle: '유아부터 초등, 중학까지 전과목 AI 스마트 학습',
    list: [
      { contitle: '쿠키', src: `${baseUrl}05.png` },
      { contitle: '키즈', src: `${baseUrl}06.png` },
      { contitle: '초등', src: `${baseUrl}07.png` },
      { contitle: '중학', src: `${baseUrl}08.png` },
    ],
  },
  {
    id: 3,
    title: '웅진북클럽',
    subtitle: '2만여 개 콘텐츠를 보유한 세상에서 가장 큰 도서관',
    list: [
      { contitle: '북클럽', src: `${baseUrl}09.png` },
      { contitle: '전집', src: `${baseUrl}10.png` },
      { contitle: '베베북클럽', src: `${baseUrl}11.png` },
      { contitle: '슈퍼팟잉글리시', src: `${baseUrl}12.png` },
    ],
  },
];
