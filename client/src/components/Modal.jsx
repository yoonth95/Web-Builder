import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import 'styles/modal.css';


const Modal = ({ isOpen,setIsOpen }) => {
  const { btn } = useSelector((state) => state.btn);
  const [title,setTitle] = useState("");
  const [choose,setChoose] = useState("");

    const closeModal = () => {
        setTitle("")
        setChoose("")
        setIsOpen(false)
    }

    const handleModalContentClick = (event) => {
        event.stopPropagation();
      };

    const saveData = ()=>{
      // 나중에 데이터 연결하고 ~ 보내고 ~ 
      setTitle("")
      setChoose("")
      setIsOpen(false)
    }


    return (
        <>
        {isOpen && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={handleModalContentClick}>
                <div className='modal_infor_box'>
                  <span>{btn==="메뉴" ? "메뉴 항목 추가" :`페이지 ${btn}`}</span>
                  <input type="text" name='title' placeholder={btn==="메뉴" ? "메뉴 항목": `페이지 ${btn}` } value={title} onChange={(e)=>setTitle(e.target.value)} />
                  {btn==="메뉴" ? 
                  <select value={choose} onChange={(e)=>setChoose(e.target.value)}>
                      <option value="" disabled selected>메뉴 순서</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    {/* <option value="0">0</option> 나중에 순서 불러와서 맵 돌릴꺼 */}
                  </select> : 
                  <input type="text" name='address' placeholder='페이지 주소'  /> }
                  {btn!=="메뉴"&&<p>{`http://localhost:3000/page/`}</p>}
                </div>
               <div className='modal_btn_box'>
                <button onClick={closeModal}>닫기</button>
                <button onClick={saveData}>저장</button>
               </div>
              </div>
            </div>
          )}
        </>
    );
};

export default Modal;