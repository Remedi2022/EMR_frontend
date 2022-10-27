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
    const doctorList = ["박의사", "김의사", "최의사"];
    const [selected, setSelected] = useState("");

    
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
        benefitType: "건강 보험",
        purpose: "일반 진료",
        purposeDetail : "", // 세부목적
        // doctorName : "", // 담당의 선택
        // pregnant : "", // 임신여부(임신이면 1, 아니면 0)
        temperature : "",
        weight : "",
        height : "",
        bloodPressureHigh : "",   
        bloodPressureLow : "",
        bloodSugar : "",
    });
    
    const {
        benefitType,
        purpose,
        purposeDetail,
        // doctorName,
        // pregnant,
        temperature,
        weight,
        height,
        bloodPressureHigh,
        bloodPressureLow,
        bloodSugar
    } = inputValue;
        
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value }); 
        // name 키에 맞는 키값(value)를 가져온다. => 계산된 속성명 
    };
    
    const handleSelect = (e) => {
        setSelected(e.target.value);
      };    

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(inputValue)
        console.log(selected)
        // console.log('자격구분:', benefitType)
        // console.log('방문목적:', purpose)
        
        // if (!pName) {
        //     return alert("이름를 입력하세요.");
        // }
        // else if (!RRN1 || !RRN2) {
        //     return alert("주민등록번호를 입력하세요.");
        // }

        let body = {
            benefit_type: benefitType,
            purpose: purpose,
            purpose_detail : purposeDetail, // 세부목적
            doctor_name : selected, // 담당의 선택
            // pregnant : 1, // 임신여부(임신이면 1, 아니면 0)
            temperature : temperature,
            weight : weight,
            height : height,
            blood_pressure_high : bloodPressureHigh,   
            blood_pressure_low : bloodPressureLow,
            blood_sugar : bloodSugar
        }

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

                    <form id="reception">
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
                                    <button className="infoButton" type="button">
                                        일반 진료
                                    </button>
                                    {/* <select className="infoButton" name="purpose" value={} onChange={handleInput}>
                                        <option value="default">선택하세요</option>
                                        <option value="general">일반 진료</option>
                                    </select> */}
                                </div>
                                <div className="receptionInfoTitle">
                                    <span className="patientInfoTitle">세부 목적</span>
                                        <input id="purposeContent"
                                            className="detailPurpose"
                                            type="string"
                                            name="purposeDetail"
                                            value={purposeDetail}
                                            onChange={handleInput}
                                        />
                                </div>
                                <div className="receptionInfoTitle">
                                    <span className="patientInfoTitle">담당의 선택*</span>
                                    <select className="infoButton" name="doctorName" value={selected} onChange={handleSelect}>
                                        <option value="default">
                                            선택하세요
                                        </option>
                                        {doctorList.map(item => (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        ))}
                                        {/* <option value="park">박의사</option>
                                        <option value="kim">김의사</option>
                                        <option value="lee">이의사</option> */}
                                    </select>
                                </div>
                                {/* <div className="receptionInfoTitle">
                                    <div className="prergnantWrapperr">
                                        <span className="patientInfoTitle">임신 여부</span>
                                        <input type="checkbox" id="pregnant" value={1} onChange={handleInput}/>
                                        <label htmlFor="pregnant" className="pregnant" style={{fontSize:"0.9em", color:"black"}} >임산부</label>  
                                    </div>
                                </div> */}
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
                                            name="temperature"
                                            value={temperature}
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
                                                name="weight"
                                                value={weight}
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
                                                name="height"
                                                value={height}
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
                                                name="bloodPressureHigh"
                                                placeholder="최고"
                                                value={bloodPressureHigh}
                                                onChange={handleInput}
                                        />
                                        <input id="bloodPressureLowContent"
                                                className="bloodPressureLowInput"
                                                type="number"
                                                name="bloodPressureLow"
                                                placeholder="최저"
                                                value={bloodPressureLow}
                                                onChange={handleInput}
                                        />
                                        <hr className="divider"></hr>
                                        <span className="vitalSign">129&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;87</span>
                                    </div>
                                </div>
                                <div className="receptionInfoTitle">
                                    <span className="patientInfoTitle">혈당</span>
                                    <div className="vitalContentWrapper">
                                        <input id="bloodSugarContent"
                                                className="vitalInput"
                                                type="number"
                                                name="bloodSugar"
                                                value={bloodSugar}
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
                        <button className="receptionBtn" onClick={ onSubmitHandler } form="reception" >접수</button>
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