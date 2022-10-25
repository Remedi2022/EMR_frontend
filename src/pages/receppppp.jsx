import './Reception.css';
import LeftNav from "../components/LeftNav/LeftNav"
import TopBar from "../components/TopBar/TopBar"
import PatientList from "../components/PatientList/PatientList"
import Moment from 'moment';
import "moment/locale/ko";
import { Link } from 'react-router-dom';
import Clock from '../Clock/Clock.jsx';

function Content(){

    function refreshPage(){
        window.location.reload(false);
    }
    
    return(
        <div className="display">
            <div className="receptionContainer">
                <div className="visitHistory">
                    <span className="title"> 최근 방문 기록</span>
                    <ul className='visitList'>
                        <li className='patientlistItem'>
                            2022-06-19 김의사
                        </li>
                        <li className='patientlistItem'>
                            2022-08-03 김의사
                        </li>
                    </ul>
                </div>

                <div className="receptionWrapper">
                    <div className="titleWrapper">
                        <span className="title" style={{fontSize:"1.3em"}}>외래접수</span>
                        <span><Clock />🖊</span>
                    </div>
                    <div className="receptionContentWrapper">
                        <div className="receptionInfoTitle">
                            <span className="patientInfoTitle">no. 132</span>
                            <div className="patientInfoName">
                                <span className="patientName" style={{fontSize:"1.3em"}}>김메디</span>
                                <span className="patientInfo">여, 30세</span>
                            </div>
                        </div>
                        <div className="receptionInfoWrapper">
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">주민등록번호</span>
                                <span>111111-1111111</span>
                            </div>
                            <div className="receptionInfoTitle">
                               <span className="patientInfoTitle">대표 연락처</span>
                               <span>010-1234-5678</span>
                            </div>
                            <div className="receptionInfoTitle">
                               <span className="patientInfoTitle">비상 연락처</span>
                               <span>010-9876-5432</span>
                            </div>
                            <div className="receptionInfoTitle">
                               <span className="patientInfoTitle">주소</span>
                               <span>서울시 동작구</span>
                            </div>
                        </div>
                    </div>
                    <div className="receptionContentWrapper">
                        <div className="insuranceTitle">
                            <span className="title">보험 정보</span>
                        </div> 
                        <div className="qualificationWrapper">
                            <div className="qualified">
                                <span className="qualificationDate">자격일자(<Clock />) 조회됨</span>
                                <img className='CheckIcon' src={ process.env.PUBLIC_URL + '/icons/Check.png' } />
                            </div>
                            <img className='RefreshIcon' onClick={refreshPage} src={ process.env.PUBLIC_URL + '/icons/159061.png' } />
                        </div>
                        <div className="receptionInfoWrapper">
                            <div className="receptionInfoTitle">
                            <span className="patientInfoTitle">자격 구분</span>
                            <span>건강보험</span>
                            </div>
                        </div>
                    </div>
                        
                    <div className="receptionContentWrapper">
                        <span className="title">접수 정보</span>
                        {/* <form onSubmit={ onSubmitHandler }> */}
                        <div className="receptionInfoWrapper">
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">방문 목적*</span>
                                <button className="infoButton">일반진료</button>
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">세부목적</span>
                                    <input id="purposeContent"
                                        className="detailPurpose"
                                        type="string"
                                        name="purposeContent"
                                        // value={purprose}
                                        // onChage={onPurposeHandler}
                                        />
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">담당의 선택*</span>
                                <select className="infoButton" name="doctor">
                                    <option value="park">박의사</option>
                                    <option value="kim">김의사</option>
                                    <option value="lee">이의사</option>
                                </select>
                            </div>
                            <div className="receptionInfoTitle">
                                <div className="prergnantWrapperr">
                                    <span className="patientInfoTitle">임신여부</span>
                                    <input type="checkbox" id="id"/>
                                    <label htmlFor="id"></label>
                                    <label htmlFor="id" className="pregnant" style={{fontSize:"0.9em", color:"black"}} >임산부</label>  
                                </div>
                        </div>
                        {/* </form> */}
                    </div>
                    </div>
                    <div className="receptionContentWrapper">
                        <span className="title">바이탈 싸인</span>
                        <div className="receptionInfoWrapper">
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">체온</span>
                                <div className="vitalContentWrapper">
                                    <input id="temperatureContent"
                                        className="vitalInput"
                                        type="number"
                                        name="temperatureContent"
                                        // value={purprose}
                                        // onChage={onPurposeHandler}
                                    />
                                    <hr className="divider"></hr>
                                </div> 
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">체중</span>
                                <div className="vitalContentWrapper">
                                    <input id="weightContent"
                                            className="vitalInput"
                                            type="number"
                                            name="weighteContent"
                                            // value={purprose}
                                            // onChage={onPurposeHandler}
                                    /> 
                                    <hr className="divider"></hr>    
                                </div>               
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">신장</span>
                                <div className="vitalContentWrapper">
                                    <input id="heightContent"
                                            className="vitalInput"
                                            type="number"
                                            name="heightContent"
                                            // value={purprose}
                                            // onChage={onPurposeHandler}
                                    />   
                                    <hr className="divider"></hr>     
                                </div>                  
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">혈압</span>
                                <div className="vitalContentWrapper">
                                    <input id="bloodPressrueContent"
                                            className="vitalInput"
                                            type="number"
                                            name="bloodPressureContent"
                                            // value={purprose}
                                            // onChage={onPurposeHandler}
                                    />
                                    <hr className="divider"></hr>
                                </div>
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">혈당</span>
                                <div className="vitalContentWrapper">
                                    <input id="bloodsugarContent"
                                            className="bloodsugarInput"
                                            type="number"
                                            name="bloodsugarContent"
                                            placeholder="최고"
                                            // value={purprose}
                                            // onChage={onPurposeHandler}
                                    />
                                    <input id="bloodsugarContent"
                                            className="bloodsugarInput"
                                            type="number"
                                            name="bloodsugarContent"
                                            placeholder="최저"
                                            // value={purprose}
                                            // onChage={onPurposeHandler}
                                    />
                                    <hr className="divider"></hr>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="receptionBtnWrapper">
                        <Link to = "/administration">
                            <button className="receptionBtn">취소</button>
                        </Link>
                        <button className="receptionBtn">접수</button>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default function Reception(){
    return(
        <div className="reception">
            <div className="container">
                <LeftNav />
                <div className='topbarContainer'>
                    <TopBar />
                    <div className='patientlistContainer'>
                        <PatientList/>
                        <Content />
                    </div>
                </div>
                {/* <div className=""> page </div> */}
            </div>
        </div>
        // <div className="receptionContainer">
        //     <Content />
        // </div>
    )
}
