import './Reception.css';
import LeftNav from "../components/LeftNav/LeftNav"
import TopBar from "../components/TopBar/TopBar"
import PatientList from "../components/PatientList/PatientList"
import Moment from 'moment';
import "moment/locale/ko";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Clock from '../Clock/Clock.jsx';

// search 후 선택한 patient 넘겨받음
let patient = {
    "pid" : "000007",
    "name" : "우성주",
    "rrn" : "999999-2222222", // 주민번호 약자, xxxxxx-xxxxxxx
    "phone" : "010-9999-2222", //01011111111
    "first_responder" : "010-1111-1111", // 비상 연락처
    "address" : "와우산로 94"
}

function refreshPage(){
    window.location.reload(false);
}

function Content(){
    // var pid = patient.pid
    const [loading, setLoading] = useState(true);
    const [visitors, setVisitors] = useState([]);

    // const getVisitors = async() => {
    //     const response = await axios.get(
    //         `http://3.35.231.145:8080/api/visitor/info?pid=${patient.pid}`
    //     );
    //     setVisitors(response.data.result);
    //     setLoading(false);
    // };
    // useEffect(() => {
    //     getVisitors();
    // }, []); //한 번만 동작함
    // console.log(visitors)

    const [inputValue, setInputValue] = useState({
        // 사용할 문자열들을 저장하는 객체 형채로 관리
        benefit_type: "일반진료",
        purpose: "일반진료",
        purpose_detail : "감기", // 세부목적
        doctor_name : "박정민", // 담당의 선택
        pregnant : 1, // 임신여부(임신이면 1, 아니면 0)
        temperature : 36,
        weight : 55,
        height : 165,
        blood_pressure_high : 128,   
        blood_pressure_low : 80,
        blood_sugar : 95
    });
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value }); 
        // name 키에 맞는 키값(value)를 가져온다. => 계산된 속성명 
    };

    const onSubmitHandler = (e) => {
        // e.preventDefault();
        // console.log('PNAME', pName)
        // console.log('RRN:', RRN)
        // console.log('PHONE', phone)
        // console.log('EPHONE:', ePhone)
        // console.log('ADDRESS:', fulladdress)
        
        // if (!pName) {
        //     return alert("이름를 입력하세요.");
        // }
        // else if (!RRN1 || !RRN2) {
        //     return alert("주민등록번호를 입력하세요.");
        // }
        // else if (!phone1 || !phone2 || !phone3) {
        //     return alert("연락처를 입력하세요.");
        // }
        // else if (!ePhone1 || !ePhone2 || !ePhone3) {
        //     return alert("비상 연락처를 입력하세요.");
        // }
        // else if (!address) {
        //     return alert("주소를 검색하세요.");
        // }

        // let body = {
        //     name : pName,
        //     // gender : ,
        //     rrn : RRN,
        //     phone : phone,
        //     first_responder : ePhone,
        //     address : fulladdress
        // }

        // dispatch(registerPatient(body))
        //     .then(response => {
        //         console.log('DISPATCH:', response)
        //         if(response.payload.success) {
        //             console.log(response.payload.message);
        //             alert('환자가 등록되었습니다.');
        //             resetModal();
        //             //환자 등록 성공 메세지
        //     }   else {
        //             alert('환자 등록에 실패하였습니다.')
        //     }
        // })
    }

    return(
        <div className="content">
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
                        <span className="title" style={{fontSize:"0.9rem"}}>외래 접수</span>
                        <span><Clock />&nbsp;🖊</span>
                    </div>
                    <div className="receptionContentWrapper">
                        <div className="receptionInfoTitle">
                            <span className="patientInfoTitle">no. {patient.pid}</span>
                            <div className="patientInfoName">
                                <span className="patientName" style={{fontSize:"1.1rem"}}>{patient.name}</span>
                                {/* <span className="patientInfo">여, 30세</span> */}
                            </div>
                        </div>
                        <div>
                            {/* {loading ? (
                                <div>Loading...</div>
                                ) : ( */}
                                <div className="receptionInfoWrapper">
                                    <div className="receptionInfoTitle">
                                        <span className="patientInfoTitle">주민등록번호</span>
                                        <span>{patient.rrn}</span>
                                    </div>
                                    <div className="receptionInfoTitle">
                                        <span className="patientInfoTitle">대표 연락처</span>
                                        <span>{patient.phone}</span>
                                    </div>
                                    <div className="receptionInfoTitle">
                                        <span className="patientInfoTitle">비상 연락처</span>
                                        <span>{patient.first_responder}</span>
                                    </div>
                                    <div className="receptionInfoTitle">
                                        <span className="patientInfoTitle">주소</span>
                                        <span>{patient.address}</span>
                                    </div>
                                </div>
                            {/* )} */}
                        </div>
                    </div>

                    <form>
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
                                <select className="infoButton" name="benefitType" onChange={handleInput}>
                                    <option value="NHI">건강 보험</option>
                                    <option value="medicalAid">의료 급여</option>
                                </select>
                                </div>
                            </div>
                        </div>
                            
                        <div className="receptionContentWrapper">
                            <span className="title">접수 정보</span>
                            <div className="receptionInfoWrapper">
                                <div className="receptionInfoTitle">
                                    <span className="patientInfoTitle">방문 목적*</span>
                                    <select className="infoButton" name="purspose" onChange={handleInput}>
                                        <option value="NHI">일반 진료</option>
                                    </select>
                                </div>
                                <div className="receptionInfoTitle">
                                    <span className="patientInfoTitle">세부목적</span>
                                        <input id="purposeContent"
                                            className="detailPurpose"
                                            type="string"
                                            name="purposeContent"
                                            // value={purpose}
                                            onChange={handleInput}
                                            />
                                </div>
                                <div className="receptionInfoTitle">
                                    <span className="patientInfoTitle">담당의 선택*</span>
                                    <select className="infoButton" name="doctor" onChange={handleInput}>
                                        <option value="park">박의사</option>
                                        <option value="kim">김의사</option>
                                        <option value="lee">이의사</option>
                                    </select>
                                </div>
                                <div className="receptionInfoTitle">
                                    <div className="prergnantWrapperr">
                                        <span className="patientInfoTitle">임신여부</span>
                                        <input type="checkbox" id="id" onChange={handleInput}/>
                                        <label htmlFor="id"></label>
                                        <label htmlFor="id" className="pregnant" style={{fontSize:"0.9em", color:"black"}} >임산부</label>  
                                    </div>
                            </div>
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
                                            // value={purpose}
                                            onChange={handleInput}
                                        />
                                        <hr className="divider"></hr>
                                        <span className="vitalSign">37</span>
                                    </div> 
                                </div>
                                <div className="receptionInfoTitle">
                                    <span className="patientInfoTitle">체중</span>
                                    <div className="vitalContentWrapper">
                                        <input id="weightContent"
                                                className="vitalInput"
                                                type="number"
                                                name="weighteContent"
                                                // value={purpose}
                                                onChange={handleInput}
                                        /> 
                                        <hr className="divider"></hr> 
                                        <span className="vitalSign">68</span>   
                                    </div>               
                                </div>
                                <div className="receptionInfoTitle">
                                    <span className="patientInfoTitle">신장</span>
                                    <div className="vitalContentWrapper">
                                        <input id="heightContent"
                                                className="vitalInput"
                                                type="number"
                                                name="heightContent"
                                                // value={purpose}
                                                onChange={handleInput}
                                        />   
                                        <hr className="divider"></hr>   
                                        <span className="vitalSign">159</span>  
                                    </div>                  
                                </div>
                                <div className="receptionInfoTitle">
                                    <span className="patientInfoTitle">혈압</span>
                                    <div className="vitalContentWrapper">
                                        <input id="bloodPressureHighContent"
                                                className="bloodPressureHighInput"
                                                type="number"
                                                name="bloodPressureHighContent"
                                                placeholder="최고"
                                                // value={purpose}
                                                onChange={handleInput}
                                        />
                                        <input id="bloodPressureLowContent"
                                                className="bloodPressureLowInput"
                                                type="number"
                                                name="bloodPressureLowContent"
                                                placeholder="최저"
                                                // value={purpose}
                                                onChange={handleInput}
                                        />
                                        <hr className="divider"></hr>
                                        <span className="vitalSign">129ㅤ/ㅤ87</span>
                                    </div>
                                </div>
                                <div className="receptionInfoTitle">
                                    <span className="patientInfoTitle">혈당</span>
                                    <div className="vitalContentWrapper">
                                        <input id="bloodSugarContent"
                                                className="vitalInput"
                                                type="number"
                                                name="bloodSugarContent"
                                                // value={purpose}
                                                onChange={handleInput}
                                        />
                                        <hr className="divider"></hr>
                                        <span className="vitalSign">86</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

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