import './Reception.css';
import LeftNav from "../components/LeftNav/LeftNav"
import TopBar from "../components/TopBar/TopBar"
import PatientList from "../components/PatientList/PatientList"


function Content(){
    return(
        <div className="content">
            {/* <div className="patientSummary">
                <div>
                    <span style={{fontWeight:"bold"}}>김메디&nbsp;&nbsp;</span>
                    <span>여, 25세</span>
                </div>
                <span>체온 37&nbsp;&nbsp;체중 55&nbsp;&nbsp;신장 160&nbsp;&nbsp;혈압 129/87&nbsp;&nbsp;혈당 86</span>
            </div> */}
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
                        <span className="title" style={{fontSize:"1.3em"}}>외래 접수</span>
                        <span>2022-10-05 10:55 🖊</span>
                    </div>
                    <div className="receptionContentWrapper">
                        <div className="receptionInfoTitle">
                            <span className="patientInfoTitle">no. 132</span>
                            <span className="patientName" style={{fontSize:"1.3em"}}>김메디</span>
                            <span className="patientInfo">여, 30세</span>
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
                    {/* 자격상세 토글로 구현 */}
                    <div className="receptionContentWrapper">
                        <div className="insuranceTitle">
                            <span className="title">보험 정보</span>
                            <span style={{color:"#779FFF"}}>자격 상세</span>
                        </div> 
                        <div className="claimButtonWrapper">
                            <button className="claimButton">공단 청구</button> 
                            <button className="claimButton">비청구</button>
                        </div>
                        <div className="qualificationWrapper">
                            <span className="qualificationDate">자격일자(2022-10-05) 조회됨</span>
                            <img className='CheckIcon' src={ process.env.PUBLIC_URL + '/icons/Check.png' } />
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
                        <div className="receptionInfoWrapper">
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">방문 목적*</span>
                                <button className="infoButton">일반진료</button>
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">세부 목적</span>
                                <button className="infoButton">아토피</button>
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">담당의 선택*</span>
                                <button className="infoButton">김의사</button>
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">임신 여부</span>
                                {/* <div className="option"> */}
                                    <input type="checkbox" id="id"/>
                                    <label htmlFor="id"></label>
                                    <label htmlFor="id" className="pregnant" style={{fontSize:"0.9em", color:"black"}} >임산부</label>  
                                {/* </div> */}
                        </div>
                    </div>
                    </div>
                    <div className="receptionContentWrapper">
                        <span className="title">바이탈 싸인</span>
                        <div className="receptionInfoWrapper">
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">체온</span>
                                <hr className="divider"></hr>
                                <span>37</span>
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">체중</span>
                                <hr className="divider"></hr>
                                <span>55</span>
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">신장</span>
                                <hr className="divider"></hr>
                                <span>167</span>
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">혈압</span>
                                <hr className="divider"></hr>
                                <span>129/87</span>
                            </div>
                            <div className="receptionInfoTitle">
                                <span className="patientInfoTitle">혈당</span>
                                <hr className="divider"></hr>
                                <span>86</span>
                            </div>
                        </div>
                    </div>
                    <div className="receptionBtnWrapper">
                        <button className="receptionBtn">취소</button>
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
