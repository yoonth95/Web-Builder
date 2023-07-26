import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import EditorModal from 'components/Modal/EditorModal';


// import Block from 'components/Main/Block';
import Nav from 'components/Main/Nav';

import 'styles/Editor/Editor.css';

const Editor = ({ isLoading, setIsLoading }) => {
  const { idx } = useParams();
  console.log(idx);

  const [blocks, setBlocks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addBlock = () => {
    const newBlock = {design: 'default' };
    setBlocks([...blocks, newBlock]);
  };
  return (
    <>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} />
      {/* <Block /> */}

      {/* 블록 추가 버튼 클릭하면 생성되는 블록 */}
      {blocks.map((block,idx) => (
        <Block key={idx} idx={idx} design={block.design} isOpen={isOpen} setIsOpen={setIsOpen} />
      ))}
      <button onClick={addBlock}>블록 추가 버튼</button>
      <EditorModal isOpen={isOpen} setIsOpen={setIsOpen} />

    </>
  );
};


// 클릭하면 에디터 모달 열리는 블록
function Block({ idx, design,isOpen,setIsOpen }) {
  return (
    <div>
      <p>Block ID: {idx}</p>
      <p>Block Design: {design}</p>
      <button onClick={() => { setIsOpen(!isOpen);}}>원하는 디자인을 선택해주세요!</button>
    </div>
  );
}


export default Editor;
