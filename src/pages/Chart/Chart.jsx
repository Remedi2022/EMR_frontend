import "./Chart.css";
import LeftNav from "../../components/LeftNav/LeftNav";
import TopBar from "../../components/TopBar/TopBar";
import PatientList from "../../components/PatientList/PatientList";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAsync from "../../_api/useAsync";
import {
  isRouteErrorResponse,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

// async function getMD(id) {
//   const response = await axios.get(`http://54.180.106.181:8080/api/md/${id}`);
//   return response.data.result;
// }

async function getMDList() {
  const response = await axios.get("http://54.180.106.181:8080/api/md/list");
  return response.data.result;
}

function Content(props) {
  const navigate = useNavigate();

  const patientInfo = props.patientInfo;
  const [patientloading, setPatientLoading] = useState(true);
  const [patientVisitListloading, setPatientVisitListloading] = useState(true);
  const [patientVS, setPatientVS] = useState([]);
  const [patientVisitList, setPatientVisitList] = useState([]);
  const [patientChart, setPatientChart] = useState([]);
  const [patientChartloading, setPatientChartloading] = useState(true);
  const [state, refetch] = useAsync(getMDList, [], true);
  const { loading, data: mdlist, error } = state; // state.data 를 users 키워드로 조회
  const [show, setShow] = useState(true);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [examination, setExamination] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [feeOption, setFeeOption] = useState(1);
  const [feeInfo, setFeeInfo] = useState("");
  const [prescribedMDList, setPrescribedMDList] = useState([]);
  const [chartInfoShow, setChartInfoShow] = useState(true);
  const last = patientVisitList[0];
  const [chartName, setChartName] = useState([]);
  const convertDoctorName = {
    "45316968-2c70-4e9a-99bd-eda5da1607ba": "박의사",
    "4a529095-ae33-49aa-97bc-6a5998df8c1e": "김의사",
    "5870c689-eaff-4595-bc5d-3d9a227464e8": "최의사",
  };
  //   console.log("ChartName:", chartName);
  // useEffect(() => {
  //   const getChartInfo = async () => {
  //     try {
  //       if (patientVisitList) {
  //         console.log(patientVisitList);
  //         const result = await axios.get(
  //           `http://54.180.106.181:8080/api/chart/list?pid=${patientVisitList[0].pid}`
  //         );
  //         console.log("result", result);
  //         setChartInfo(result.data.result);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getChartInfo();
  // }, [patientVisitList]);
  //   console.log("patientVL: ", patientVisitList);

  // GET 차트
  //   const getPatientChart = async () => {
  //     const response = await axios
  //       .get(`http://54.180.106.181:8080/api/chart/list?pid=${patientInfo.pid}`)
  //       .then((data) => {
  //         console.log("data:", data);
  //       });
  //     //   .catch((error) => {
  //     //     console.log(error.response);
  //     //   });
  //     setPatientChart(response.data.result);
  //     setPatientChartloading(false);
  //   };

  //   useEffect(() => {
  //     getPatientChart();
  //   }, []);
  //   console.log("setPatientChart: ", patientChart);

  // GET 내원이력별 차트(안됨)
  const getChartInfo = async (vid) => {
    const response = await axios.get(
      `http://54.180.106.181:8080/api/chart/list?vid=${vid}`
    );
    // console.log(response);

    setExamination(response.data.result.examination);
    setDiagnosis(response.data.result.diagnosis);
    setPrescription(response.data.result.prescription);
  };

  //   GET 환자의 바이탈싸인(안됨)
  const getPatientVS = async () => {
    const response = await axios.get(
      `http://54.180.106.181:8080/api/visit/vital?vid=${patientVisitList[0].vid}`
    );
    setPatientVS(response.data.result);
    setPatientLoading(false);
  };

  useEffect(() => {
    if (patientVisitList.length > 0) {
      getPatientVS();
    }
  }, patientVisitList); // 한 번만 동작함. patientVisitList가 생성되고 나면 그다음에 getPatientVS() 실행
  // console.log(patientInfo)
  //   useEffect(() => {
  //   console.log("VL: ",patientVisitList)
  //   console.log("VS : ", patientVS);
  //   }, [patientVS]);

  // 우측 엠디리스트에서 항목 클릭하면 처방에 md 추가됨
  const [items, setItems] = useState([]);
  const inputItems = (md) => {
    const tmpItems = [...items];
    // console.log(tmpItems.length)
    for (let i = 0; i < tmpItems.length; i++) {
      if (tmpItems[i].id === md.id) {
        return;
      }
    }
    tmpItems.push(md);
    setItems(tmpItems);
  };

  // GET 좌측 내원이력
  const getPatientVisitList = async () => {
    const response = await axios.get(
      `http://54.180.106.181:8080/api/visit/record?pid=${patientInfo.pid}`
    );
    setPatientVisitList(response.data.result);
    setPatientVisitListloading(false);
  };

  // const checkPVL = patientVisitList[1].vid;
  // console.log("patientVisitList: ", patientVisitList);
  // console.log("checkPVL: ", checkPVL);

  useEffect(() => {
    getPatientVisitList();
  }, []); //한 번만 동작함

  //   useEffect(() => {
  //   console.log('patientInfo : ', patientInfo)
  //   }, [patientInfo]);

  const changeRecord = (e) => {
    setExamination(e.target.value);
  };

  const changeDiagnosis = (e) => {
    setDiagnosis(e.target.value);
  };

  const changePrescription = (e) => {
    setPrescription(e.target.value);
  };

  const changeFeeOption = (e) => {
    setFeeOption(e.target.value);
  };

  const changePrescribedMDList = () => {
    const tmpPrerscribedMDList = [...prescribedMDList];
    if (items[items.length - 1]) {
      const newPrescribedMd = {
        md_id: items[items.length - 1].id,
        md_amount_per_unit: 1,
        md_count_per_day: 1,
        md_administration_day: 1,
      };
      tmpPrerscribedMDList.push(newPrescribedMd);
      setPrescribedMDList(tmpPrerscribedMDList);
    }
  };

  const onChangePrescribedMDItemAmount = (e, id) => {
    const tmpPrescribedMDList = [...prescribedMDList];
    const tmpPrescribedMD = tmpPrescribedMDList.filter((md) => md.md_id === id);
    tmpPrescribedMD[0].md_amount_per_unit = Number(e.target.value);

    setPrescribedMDList(tmpPrescribedMDList);
  };

  const onChangePrescribedMDItemCount = (e, id) => {
    const tmpPrescribedMDList = [...prescribedMDList];
    const tmpPrescribedMD = tmpPrescribedMDList.filter((md) => md.md_id === id);
    tmpPrescribedMD[0].md_count_per_day = Number(e.target.value);

    setPrescribedMDList(tmpPrescribedMDList);
  };

  const onChangePrescribedMDItemAdministration = (e, id) => {
    const tmpPrescribedMDList = [...prescribedMDList];
    const tmpPrescribedMD = tmpPrescribedMDList.filter((md) => md.md_id === id);
    tmpPrescribedMD[0].md_administration_day = Number(e.target.value);

    setPrescribedMDList(tmpPrescribedMDList);
  };

  useEffect(() => {
    changePrescribedMDList();
  }, [items]);

  // useEffect(() => {
  //   console.log(prescribedMDList);
  // }, [prescribedMDList]);

  const submitChart = async (e) => {
    e.preventDefault();
    const chartInfo = {
      // 변수명 같으면 옆에 따로 안써도 알아서 받아와짐
      visit_id: patientVisitList[0].vid,
      patient_id: patientInfo.pid,
      doctor_id: patientVisitList[0].doctor,
      examination: examination,
      diagnosis: diagnosis,
      prescription: prescription,
      consultation_fee: feeOption,
      prescribed_md: prescribedMDList,
      status: 3,
    };
    // console.log("진료 완료");
    // console.log("chartinfo", chartInfo);

    if (!examination) {
      return alert("진료 기록을 입력하세요");
    } else if (!diagnosis) {
      return alert("진단을 입력하세요");
    } else if (feeOption.value === "") {
      return alert("진찰료를 선택하세요.");
    }

    const response = await axios.post(
      "http://54.180.106.181:8080/api/chart/register",
      chartInfo
    );
    // console.log("result", response);
    if (response.status === 201) {
      alert("진료가 완료되었습니다.");
      setDiagnosis("");
      setExamination("");
      setFeeOption();
      setItems([]);
      setPrescription("");
      setPrescribedMDList([]);
      navigate("/examination");
    } else {
      alert("차트 작성에 실패했습니다.");
    }
  };

  // async function registerChart({ chartInfo }) {
  //     console.log('chartInfo', chartInfo)
  //     return response.status
  // }

  if (loading) return <div> MDList 로딩중..</div>;
  if (error) return <div> MDList에서 에러가 발생했습니다</div>;
  if (!mdlist) return null;

  function MDList() {
    if (loading) return <div> MDList 로딩중..</div>;
    if (error) return <div> MDList에서 에러가 발생했습니다</div>;
    if (!mdlist) return null;

    return (
      <div className="mdHistory">
        <ul className="visitList">
          {mdlist.map((md) => (
            <li
              className="MDListItem"
              key={md.id}
              onClick={() => inputItems(md)}
            >
              {md.name} {md.volume}
              {md.unit}
            </li>
          ))}
        </ul>
      </div>
    );
  }

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
      <div className="patientSummary">
        <div className="patientInfoName">
          <span style={{ fontWeight: "bold" }}>
            {patientInfo.name}&nbsp;&nbsp;
          </span>
          <span>{convertGender()},&nbsp;</span>
          <span>만 {calcAge()}세</span>
        </div>
        <span className="vitalSignSummary">
          체온 {patientVS ? patientVS.temperature : ""}&nbsp; 체중{" "}
          {patientVS ? patientVS.weight : ""}&nbsp; 신장{" "}
          {patientVS ? patientVS.height : ""}&nbsp; 혈압{" "}
          {patientVS ? patientVS.blood_pressure_high : ""}/
          {patientVS ? patientVS.blood_pressure_low : ""}&nbsp; 혈당{" "}
          {patientVS ? patientVS.blood_sugar : ""}
        </span>
      </div>
      <div className="chartContainer">
        <div className="visitHistory">
          <span className="title">내원 이력</span>
          <ul className="visitList">
            {patientVisitList
              ? patientVisitList.map((p) => {
                  return (
                    <li
                      className="chartPatientListItem"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        getChartInfo(p.vid);
                        setChartName(p);
                        setChartInfoShow(!chartInfoShow);
                      }}
                    >
                      {p.date.split("T")[0]} {convertDoctorName[p.doctor]}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>

        <div className="chartWrapper">
          <div className="chartTitleWrapper">
            <span className="title">
              {/* {chartName && (
                <li className="chartTitle">
                  🖊&nbsp;{chartName.date.split("T")[0]}{" "}
                  {convertDoctorName[chartName.doctor]}
                </li>
              )} */}

              {/* {chartInfoShow ? (
                <li className="chartTitle">
                  🖊&nbsp;{last.date.split("T")[0]}{" "}
                  {convertDoctorName[last.doctor]}
                </li>
              ) : (
                <li className="chartTitle">
                  🖊&nbsp;{chartName.date.split("T")[0]}{" "}
                  {convertDoctorName[chartName.doctor]}
                </li>
              )} */}

              {last ? (
                <li className="chartTitle">
                  🖊&nbsp;{last.date.split("T")[0]}{" "}
                  {convertDoctorName[last.doctor]}
                </li>
              ) : (
                <li className="chartTitle">
                  🖊&nbsp;{chartName.date.split("T")[0]}{" "}
                  {convertDoctorName[chartName.doctor]}
                </li>
              )}
            </span>
            <span className="chartBtn" onClick={(e) => submitChart(e)}>
              진료 완료
            </span>
          </div>
          <div className="chartContentWrapper">
            <span className="title">진료 기록</span>
            <hr className="divider"></hr>
            <div className="diagnoisRecord">
              <textarea
                className="chartRecord"
                name="recordContent"
                onChange={(e) => changeRecord(e)}
                value={examination}
              ></textarea>
            </div>
          </div>
          <div className="chartContentWrapper">
            <span className="title">진단 및 처방</span>
            <hr className="divider"></hr>
            <div className="diagnoisRecord">
              <textarea
                className="chartRecord"
                onChange={(e) => changeDiagnosis(e)}
                value={diagnosis}
              ></textarea>
            </div>
            <div className="diagnoisRecord">
              <textarea
                className="chartRecord"
                onChange={(e) => changePrescription(e)}
                value={prescription}
              ></textarea>
            </div>
            <select
              className="feeInfoButton"
              name="fee"
              id="feeInfo"
              onChange={(e) => changeFeeOption(e)}
            >
              <option selected value="">
                진찰료를 선택하세요
              </option>
              <option value={0}>초진진찰료</option>
              <option value={1}>재진진찰료</option>
            </select>
            <div className="MDPrescriptionWrapper">
              {items.map((item) => {
                return (
                  <div key={item.id} className="MDPrescription">
                    <div className="MDItem">
                      {item.name} {item.volume}
                      {item.unit}
                    </div>
                    <div className="amountList">
                      <input
                        className="amountInput"
                        type="number"
                        placeholder="1"
                        min="1"
                        style={{ color: "black" }}
                        onChange={(e) =>
                          onChangePrescribedMDItemAmount(e, item.id)
                        }
                      ></input>
                      <input
                        className="amountInput"
                        type="number"
                        placeholder="1"
                        min="1"
                        style={{ color: "black" }}
                        onChange={(e) =>
                          onChangePrescribedMDItemCount(e, item.id)
                        }
                      ></input>
                      <input
                        className="amountInput"
                        type="number"
                        placeholder="1"
                        min="1"
                        style={{ color: "black" }}
                        onChange={(e) =>
                          onChangePrescribedMDItemAdministration(e, item.id)
                        }
                      ></input>
                      <span className="amount">용법</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* </form> */}
        </div>

        <div className="MDList">
          <div
            className="MDTitle"
            onClick={() => setShow(!show)}
            style={{ cursor: "pointer" }}
          >
            <span className="title">MD 리스트</span>
            <span>▼</span>
          </div>

          {show ? (
            <div className="mdHistory">
              <ul className="visitList">
                <MDList />
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function Chart() {
  const title = "진료";
  const { pid } = useParams();

  const [patientInfo, setPatientInfo] = useState();
  const getPatientInfo = async () => {
    const numPid = parseInt(pid);
    const body = {
      pid: numPid,
    };
    const response = await axios.post(
      "http://54.180.106.181:8080/api/patient/search",
      body
    );
    setPatientInfo(response.data.result);
  };

  // console.log("Patientinfo: ", patientInfo);

  useEffect(() => {
    // console.log('get patient info')
    getPatientInfo();
  }, []);

  return (
    <div className="Chart">
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
