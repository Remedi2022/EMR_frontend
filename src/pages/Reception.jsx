import "./Reception.css";
import LeftNav from "../components/LeftNav/LeftNav";
import TopBar from "../components/TopBar/TopBar";
import PatientList from "../components/PatientList/PatientList";
import Moment from "moment";
import "moment/locale/ko";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { reception } from "../_actions/user_action";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Clock from "../Clock/checkedTime.jsx";
import { useParams } from "react-router-dom";
import Chart from './Chart';


// search 후 선택한 patient 넘겨받음
// const patientInfo = {
//     "pid" : "000007",
//     "name" : "우성주",
//     "rrn" : "999999-2222222",
//     "phone" : "010-9999-2222",
//     "first_responder" : "010-1111-1111",
//     "address" : "와우산로 94"
// }

// props로 환자 기본 정보(이름, 주민등록번호, 대표연락처, 비상연락처, 주소) 받아옴
function Content(props) {
  const dispatch = useDispatch();
  const patientInfo = props.patientInfo;
  const [loading, setLoading] = useState(true);
  // 환자 Vital Sign
  const [patientVS, setPatientVS] = useState([]);
  const doctorList = ["박의사", "김의사", "최의사"];
  const [selected, setSelected] = useState(""); //의사
  const [patientVisitListloading, setPatientVisitListloading] = useState(true);
  const [patientVisitList, setPatientVisitList] = useState([]);

  const convertDoctorID = {
    박의사: "45316968-2c70-4e9a-99bd-eda5da1607ba",
    김의사: "4a529095-ae33-49aa-97bc-6a5998df8c1e",
    최의사: "5870c689-eaff-4595-bc5d-3d9a227464e8",
  };
    
    const convertDoctorName = {
      "45316968-2c70-4e9a-99bd-eda5da1607ba": "박의사",
      "4a529095-ae33-49aa-97bc-6a5998df8c1e": "김의사",
      "5870c689-eaff-4595-bc5d-3d9a227464e8": "최의사",
    };

  // console.log('patientInfo ', patientInfo)
  // 바이탈싸인 get
  const getPatientVS = async () => {
    const response = await axios.get(
      `http://3.35.231.145:8080/api/visit/vital?pid=${patientInfo.pid}`
    );
    setPatientVS(response.data.result);
    setLoading(false);
  };

  useEffect(() => {
    getPatientVS();
  }, []); //한 번만 동작함
  // console.log(patientVS)

  // useEffect(() => {
  //     console.log('VS : ', patientVS)
  // }, [patientVS])

  const getPatientVisitList = async () => {
    const response = await axios.get(
      `http://3.35.231.145:8080/api/visit/record?pid=${patientInfo.pid}`
    );
    setPatientVisitList(response.data.result);
    setPatientVisitListloading(false);
  };

  console.log("patientVisitList: ", patientVisitList[0]);

  useEffect(() => {
    getPatientVisitList();
  }, []); //한 번만 동작함
  // console.log(getPatientVisitList)

  const [inputValue, setInputValue] = useState({
    // 사용할 문자열들을 저장하는 객체 형채로 관리
    benefitType: "건강보험",
    purpose: "일반진료",
    purposeDetail: "", // 세부목적
    // doctorName : "", // 담당의 선택
    // pregnant : "", // 임신여부(임신이면 1, 아니면 0)
    temperature: null,
    weight: null,
    height: null,
    bloodPressureHigh: null,
    bloodPressureLow: null,
    bloodSugar: null,
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
    bloodSugar,
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
    console.log(inputValue);
    console.log(selected);
    // console.log('자격구분:', benefitType)
    // console.log('방문목적:', purpose)

    if (!selected) {
      return alert("의사를 선택하세요.");
    } else if (!revisit) {
      return alert("재진 여부를 선택하세요.");
    }
    // else if (!temperature || !weight || !height || !bloodPressureHigh || !bloodPressureLow || !bloodSugar) {
    //     return alert("바이탈싸인을 입력하세요.");
    // }

    let body = {
      patient_id: patientInfo.pid,
      benefit_type: benefitType,
      purpose: purpose,
      purpose_detail: purposeDetail, // 세부목적
      doctor_id: convertDoctorID[selected], // 담당의 선택
      revisit: revisit,
      // pregnant : 1, // 임신여부(임신이면 1, 아니면 0)
      temperature: temperature,
      weight: weight,
      height: height,
      blood_pressure_high: bloodPressureHigh,
      blood_pressure_low: bloodPressureLow,
      blood_sugar: bloodSugar,
    };

    dispatch(reception(body)).then((response) => {
      // console.log('DISPATCH:', response)
      if (response.payload.success) {
        console.log(response.payload.message);
        alert("환자가 접수되었습니다.");
        navigate('/administration', {replace: true})
        //환자 접수 성공 메세지
      } else {
        alert("환자 접수에 실패하였습니다.");
      }
    });
  };

  const convertGender = () => {
    if (patientInfo.gender === "F") {
      return "여";
    } else if (patientInfo.gender === "M") {
      return "남";
    } else {
      return "";
    }
  };

  const calcAge = () => {
    const newDate = new Date();
    const YYYY = newDate.getFullYear();
    const MM = newDate.getMonth() + 1;
    const DD = newDate.getDate();

    const rrnFront = patientInfo.rrn.split("-")[0];
    const rrnFrontYY = parseInt(rrnFront.slice(0, 2));
    const rrnFrontMM = parseInt(rrnFront.slice(2, 4));
    const rrnFrontDD = parseInt(rrnFront.slice(4, 6));

    const rrnBack = patientInfo.rrn.split("-")[1];
    const rrnBackFirst = rrnBack.slice(0, 1);

      
    const convertDoctorName = {
    "45316968-2c70-4e9a-99bd-eda5da1607ba": "박의사",
    "4a529095-ae33-49aa-97bc-6a5998df8c1e": "김의사",
    "5870c689-eaff-4595-bc5d-3d9a227464e8": "최의사",
    };
      
      
    let birthYY = rrnFrontYY;

    if (rrnBackFirst === "1" || rrnBackFirst === "2") {
      birthYY = birthYY + 1900;
    } else if (rrnBackFirst === "3" || rrnBackFirst === "4") {
      birthYY = birthYY + 2000;
    }

    let age = YYYY - birthYY;

    if (MM > rrnFrontMM) {
      age = age - 1;
    } else if (MM === rrnFrontMM) {
      if (DD > rrnFrontDD) {
        age = age - 1;
      } else {
        return age;
      }
    } else {
      return age;
    }
    return age;
  };

  return (
    <div className="content">
      <div className="receptionContainer">
        <div className="visitHistory">
          <span className="title"> 최근 방문 기록</span>
          <ul className="visitList">
            {patientVisitList
              ? // <li className='patientlistItem'>patientVisitList[0]</li>:null
                patientVisitList.map((p) => {
                  return (
                    <li className="patientlistItem">
                      {p.date.split("T")[0]} {convertDoctorName[p.doctor]}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>

        <div className="receptionWrapper">
          <div className="titleWrapper">
            <span className="title" style={{ fontSize: "0.9rem" }}>
              외래 접수
            </span>
            <span>
              <Clock />
              &nbsp;🖊
            </span>
          </div>
          <div className="receptionContentWrapper">
            <div className="receptionInfoTitle">
              <span className="patientInfoTitle">no. {patientInfo.pid}</span>
              <div className="patientInfoName">
                <span className="patientName" style={{ fontSize: "1.1rem" }}>
                  {patientInfo.name}
                </span>
                <sapn className="patientInfo">{convertGender()},&nbsp;</sapn>
                <span className="patientInfo">만 {calcAge()}세</span>
              </div>
            </div>
            <div>
              {/* {loading ? (
                                <div>Loading...</div>
                                ) : ( */}
              <div className="receptionInfoWrapper">
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">주민등록번호</span>
                  <span>{patientInfo.rrn}</span>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">대표 연락처</span>
                  <span>{patientInfo.phone}</span>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">비상 연락처</span>
                  <span>{patientInfo.first_responder}</span>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">주소</span>
                  <span>{patientInfo.address}</span>
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
                  <span className="qualificationDate">
                    자격일자(
                    <Clock />) 조회됨
                  </span>
                  <img
                    className="CheckIcon"
                    src={process.env.PUBLIC_URL + "/icons/Check.png"}
                  />
                </div>
                <img
                  className="RefreshIcon"
                  src={process.env.PUBLIC_URL + "/icons/159061.png"}
                />
              </div>
              <div className="receptionInfoWrapper">
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">자격 구분</span>
                  <select
                    className="infoButton"
                    name="benefitType"
                    onChange={handleInput}
                  >
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
                  <input
                    id="purposeContent"
                    className="detailPurpose"
                    type="string"
                    name="purposeDetail"
                    value={purposeDetail}
                    onChange={handleInput}
                  />
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">담당의 선택*</span>
                  <select
                    className="infoButton"
                    name="doctorName"
                    value={selected}
                    onChange={handleSelect}
                  >
                    <option value="default">선택하세요</option>
                    {doctorList.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                    {/* <option value="park">박의사</option>
                                        <option value="kim">김의사</option>
                                        <option value="lee">이의사</option> */}
                  </select>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">재진 여부*</span>
                  <select
                    className="infoButton"
                    name="revisit"
                    value={revisit}
                    onChange={handleRevisit}
                  >
                    <option value="default">선택하세요</option>
                    <option value="1">초진</option>
                    <option value="2">재진</option>
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
<<<<<<< HEAD

            <div className="receptionContentWrapper">
              <span className="title">바이탈 싸인</span>
              <div className="receptionInfoWrapper">
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">체온</span>
                  <div className="vitalContentWrapper">
                    <input
                      id="temperatureContent"
                      className="vitalInput"
                      type="number"
                      name="temperature"
                      value={temperature}
                      onChange={handleInput}
                    />
                    <hr className="divider"></hr>
                    <span className="vitalSign">
                      {patientVS ? patientVS.temperature : ""}
                    </span>
                  </div>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">체중</span>
                  <div className="vitalContentWrapper">
                    <input
                      id="weightContent"
                      className="vitalInput"
                      type="number"
                      name="weight"
                      value={weight}
                      onChange={handleInput}
                    />
                    <hr className="divider"></hr>
                    <span className="vitalSign">
                      {patientVS ? patientVS.weight : ""}
                    </span>
                  </div>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">신장</span>
                  <div className="vitalContentWrapper">
                    <input
                      id="heightContent"
                      className="vitalInput"
                      type="number"
                      name="height"
                      value={height}
                      onChange={handleInput}
                    />
                    <hr className="divider"></hr>
                    <span className="vitalSign">
                      {patientVS ? patientVS.height : ""}
                    </span>
                  </div>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">혈압</span>
                  <div className="vitalContentWrapper">
                    <input
                      id="bloodPressureHighContent"
                      className="bloodPressureHighInput"
                      type="number"
                      name="bloodPressureHigh"
                      placeholder="최고"
                      value={bloodPressureHigh}
                      onChange={handleInput}
                    />
                    <input
                      id="bloodPressureLowContent"
                      className="bloodPressureLowInput"
                      type="number"
                      name="bloodPressureLow"
                      placeholder="최저"
                      value={bloodPressureLow}
                      onChange={handleInput}
                    />
                    <hr className="divider"></hr>
                    <span className="vitalSign">
                      {patientVS ? patientVS.blood_pressure_high : null}
                      &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                      {patientVS ? patientVS.blood_pressure_low : null}
                    </span>
                  </div>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">혈당</span>
                  <div className="vitalContentWrapper">
                    <input
                      id="bloodSugarContent"
                      className="vitalInput"
                      type="number"
                      name="bloodSugar"
                      value={bloodSugar}
                      onChange={handleInput}
                    />
                    <hr className="divider"></hr>
                    <span className="vitalSign">
                      {patientVS ? patientVS.blood_sugar : null}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="receptionBtnWrapper">
            <Link to="/administration">
              <button className="receptionBtn">취소</button>
            </Link>
            <button
              className="receptionBtn"
              onClick={onSubmitHandler}
              form="reception"
            >
              접수
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
=======
>>>>>>> main

            <div className="receptionContentWrapper">
              <span className="title">바이탈 싸인</span>
              <div className="receptionInfoWrapper">
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">체온</span>
                  <div className="vitalContentWrapper">
                    <input
                      id="temperatureContent"
                      className="vitalInput"
                      type="number"
                      name="temperature"
                      value={temperature}
                      onChange={handleInput}
                    />
                    <hr className="divider"></hr>
                    <span className="vitalSign">
                      {patientVS ? patientVS.temperature : ""}
                    </span>
                  </div>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">체중</span>
                  <div className="vitalContentWrapper">
                    <input
                      id="weightContent"
                      className="vitalInput"
                      type="number"
                      name="weight"
                      value={weight}
                      onChange={handleInput}
                    />
                    <hr className="divider"></hr>
                    <span className="vitalSign">
                      {patientVS ? patientVS.weight : ""}
                    </span>
                  </div>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">신장</span>
                  <div className="vitalContentWrapper">
                    <input
                      id="heightContent"
                      className="vitalInput"
                      type="number"
                      name="height"
                      value={height}
                      onChange={handleInput}
                    />
                    <hr className="divider"></hr>
                    <span className="vitalSign">
                      {patientVS ? patientVS.height : ""}
                    </span>
                  </div>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">혈압</span>
                  <div className="vitalContentWrapper">
                    <input
                      id="bloodPressureHighContent"
                      className="bloodPressureHighInput"
                      type="number"
                      name="bloodPressureHigh"
                      placeholder="최고"
                      value={bloodPressureHigh}
                      onChange={handleInput}
                    />
                    <input
                      id="bloodPressureLowContent"
                      className="bloodPressureLowInput"
                      type="number"
                      name="bloodPressureLow"
                      placeholder="최저"
                      value={bloodPressureLow}
                      onChange={handleInput}
                    />
                    <hr className="divider"></hr>
                    <span className="vitalSign">
                      {patientVS ? patientVS.blood_pressure_high : null}
                      &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                      {patientVS ? patientVS.blood_pressure_low : null}
                    </span>
                  </div>
                </div>
                <div className="receptionInfoTitle">
                  <span className="patientInfoTitle">혈당</span>
                  <div className="vitalContentWrapper">
                    <input
                      id="bloodSugarContent"
                      className="vitalInput"
                      type="number"
                      name="bloodSugar"
                      value={bloodSugar}
                      onChange={handleInput}
                    />
                    <hr className="divider"></hr>
                    <span className="vitalSign">
                      {patientVS ? patientVS.blood_sugar : null}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>

// 환자 검색하여
// props로 환자 기본 정보(이름, 주민등록번호, 대표연락처, 비상연락처, 주소) 받아옴
export default function Reception() {
  const title = "원무";
  const { pid } = useParams();

    const [patientInfo, setPatientInfo] = useState()
    const getPatientInfo = async () => {
        const numPid = parseInt(pid)
        const body = {
            pid: numPid
        }
        const response = await axios.post('http://3.35.231.145:8080/api/patient/search', body)
        setPatientInfo(response.data.result)
    }

  useEffect(() => {
    // console.log('get patient info')
    getPatientInfo();
  }, []);

  // useEffect(() => {
  //     console.log('patientInfo : ', patientInfo)
  // }, [patientInfo])

  // const patientInfo = {
  //     "pid" : "000006",
  //     "name" : "우성주",
  //     "gender" : "F",
  //     "rrn" : "971005-2222222",
  //     "phone" : "010-9999-2222",
  //     "first_responder" : "010-1111-1111",
  //     "address" : "와우산로 94"
  // }

  // 검색 결과로 환자 pid 받아서 접수 진행
  // props로 받아서 <Content />에 바로 넘겨줄 수 있는지?
  // 아니면 쿼리 파라미터 이용? 그러려면 영교가 적어놓은 api 주소에 추가?

  return (
    <div className="reception">
      <div className="container">
        <LeftNav />
        <div className="topbarContainer">
          <TopBar title={title} />
          <div className="patientlistContainer">
            <PatientList />
            {patientInfo ? <Content patientInfo={patientInfo} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
