import React, {useState} from 'react';
import SelectBox from 'components/Management/SelectBox';
import 'styles/Modal/LinkModal.css';
const LinkModal = ({block_id, idx}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
        <div className='modal-overlay'>
          <div className='modal-content' >
            <div className='modal_infor_box'>
              <span>링크 설정</span>
            </div>
            <div className={`modal_link_check ${isChecked ? 'checked' : ''}`}>
              <input type="checkbox" className='notUse' checked={isChecked} onChange={toggleCheckbox}/>
              <label>링크 없음</label>
            </div>
            <div className='modal_btn_box'>
              <button>닫기</button>
              <button>확인</button>
            </div>
          </div>
        </div>
  );
};

export default LinkModal;