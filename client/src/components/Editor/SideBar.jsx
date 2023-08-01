import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import 'styles/Editor/SideBar.css';

const SideBar = ({ setSideBarOpen, sideBarOpen, blockStyle, setBlockStyle }) => {
  const [iconColor, setIconColor] = useState("#8f8f8f");

  console.log(blockStyle);

  const handleTopPaddingChange = (e) => {
    // setTopPadding(e.target.value);
  };

  const handleBottomPaddingChange = (e) => {
    // setBottomPadding(e.target.value);
  };

  return (
      <div className="subMenu sub_menu" style={{ display: 'block' }}>
        <div className='title_wrap'>
          <h3>상하 여백</h3>
          <FontAwesomeIcon icon={faTimes} style={{color: iconColor, cursor:"pointer"}} onClick={() => setSideBarOpen(!sideBarOpen)} size='2x' onMouseEnter={() => setIconColor("#f3f3f3")} onMouseLeave={() => setIconColor("#8f8f8f")}/>
        </div>
        <ul className="sub_menu_list v2">
          <li>
            <p className="title1" style={{ width: '100%' }}>상 <span id="paddingTopVal" className="num">{0}</span> <span className="px">px</span></p>
            <div style={{ padding: '5px 0 0 10px', marginBottom:"10px" }}>
              <input type="range" className="radioCheckSelect range_style1" name="padding_top" min="0" max="400" step="10" value={0} onChange={handleTopPaddingChange} /> 
              <ol className="range_datalist">
                <li>0</li>
                <li>200</li>
                <li>400</li>
              </ol>
            </div>
          </li>
          <li>
            <p className="title1" style={{ width: '100%' }}>하 <span id="paddingBottomVal" className="num">{0}</span> <span className="px">px</span></p>
            <div style={{ padding: '5px 0 0 10px' }}>
              <input type="range" className="radioCheckSelect range_style1" name="padding_bottom" min="0" max="400" step="10" value={0} onChange={handleBottomPaddingChange} />
              <ol className="range_datalist">
                <li>0</li>
                <li>200</li>
                <li>400</li>
              </ol>
            </div>
          </li>
        </ul>
      </div>
  );
};

export default SideBar;
