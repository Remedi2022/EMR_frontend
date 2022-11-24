import "./Payment.css";
import LeftNav from "../../components/LeftNav/LeftNav";
import TopBar from "../../components/TopBar/TopBar";
import PatientList from "../../components/PatientList/PatientList";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { isRouteErrorResponse, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { payment } from "../../_actions/user_action";

function Content(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const patientInfo = props.patientInfo;
  const [patientloading, setPatientLoading] = useState(true);
  const [patientVisitListloading, setPatientVisitListloading] = useState(true);
  const [payInfo, setPayInfo] = useState(); // 수납할 금액 정보
  const [patientVS, setPatientVS] = useState([]);
  const [patientVisitList, setPatientVisitList] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [show, setShow] = useState(true);
//   const last = patientVisitList[0];

  const convertDoctorName = {
    "45316968-2c70-4e9a-99bd-eda5da1607ba": "박의사",
    "4a529095-ae33-49aa-97bc-6a5998df8c1e": "김의사",
    "5870c689-eaff-4595-bc5d-3d9a227464e8": "최의사",
  };

  const getPatientVS = async () => {
    const response = await axios.get(
      `http://54.180.106.181:8080/api/visit/vital?pid=${patientInfo.pid}`
    );
    setPatientVS(response.data.result);
    setPatientLoading(false);
  };

  useEffect(() => {
    getPatientVS();
  }, []); //한 번만 동작함
  // console.log(patientVS)

  // useEffect(() => {
  //     console.log('VS : ', patientVS)
  // }, [patientVS])

  //* 좌측 내원이력

  useEffect(() => {
    const getPatientVisitList = async () => {
      const response = await axios.get(
        `http://54.180.106.181:8080/api/visit/record?pid=${patientInfo.pid}`
      );
      // console.log("patient visit list ", response.data.result);
      setPatientVisitList(response.data.result);
      setPatientVisitListloading(false);
    };
    getPatientVisitList();
  }, []); //한 번만 동작함
  // console.log(getPatientVisitList)

  // useEffect(() => {
  //   console.log("VL : ", patientVisitList[0]);
  // }, [patientVisitList]);

  //* 우측 MD리스트
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        // setResults(null);
        setResults(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          "http://54.180.106.181:8080/api/md/list"
        );
        setResults(response.data); // 데이터는 response.data 안에 들어있습니다.
        // console.log(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  //* 수납 get
  useEffect(() => {
    const getPayInfo = async () => {
      try {
        if (patientVisitList) {
          const result = await axios.get(
            `http://54.180.106.181:8080/api/payment/price?vid=${patientVisitList[0].vid}`
          );
        //   console.log("result", result);
          setPayInfo(result.data.result);
        }
      } catch (err) {
        console.error(err);
      }
    };
      

    getPayInfo();
  }, [patientVisitList]);

  //* 수납내역 post

  //* paidAmount = individualCopayment + nhisCopayment + uninsuredPayment

  // const [visitId, setVisitId] = useState(0)

  // useEffect(() => {
  //     setVisitId(patientVisitList[0].vid)
  //     console.log(patientVisitList)
  // }, [patientVisitList])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(inputValue);

    // if (!selected) {
    //     return alert("의사를 선택하세요.");
    // }
    // else if (!temperature || !weight || !height || !bloodPressureHigh || !bloodPressureLow || !bloodSugar) {
    //     return alert("바이탈싸인을 입력하세요.");
    // }

    let body = {
      paid_amount:
        payInfo.individual_copayment +
        payInfo.uninsured_payment +
        payInfo.nhis_copayment, // 수납 완료한 금액
      payment_type: "카드", // 결제 수단을 여러 개로 나눠서 결제할 수 있음 // 카드
      visit_id: patientVisitList[0].vid,
      status: 4,
    };
    // console.log("body", body);

    dispatch(payment(body)).then((response) => {
      // console.log("DISPATCH:", response);
      if (response.payload.success) {
        // console.log(response.payload.message);
        alert("수납이 완료되었습니다.");
        navigate("/administration", { replace: true });
        //수납 성공 메세지
      } else {
        alert("수납에 실패하였습니다.");
      }
    });
  };
  ///////////////////////////////// 수납내역 post 코드 끝

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

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!results) return null;

    // console.log("patientvisitlist: ",patientVisitList)
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
      <div className="paymentContainer">
        <div className="visitHistory">
          <span className="title">내원 이력</span>
          <ul className="visitList">
            {patientVisitList
              ? patientVisitList.map((p) => {
                  return (
                    <li className="patientlistItem">
                      {p.date.split("T")[0]} {convertDoctorName[p.doctor]}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>

        <div className="paymentWrapper">
          <div className="paymentDate">
            <span className="title">
              {/* <li className="patientlistItem">
                🖊&nbsp;{patientVisitList[0].date.split("T")[0]}{" "}
                {convertDoctorName[patientVisitList[0].doctor]}
              </li> */}
            </span>
          </div>

          <div className="paymentContentWrapper">
            <span className="title"></span>
            <form>
              <div className="paymentContentItem" id="itemPay">
                <span className="title">수납 내역</span>
                <div className="toBeReceived">
                  <div className="itemAmount">
                    <span className="title">받을 금액</span>
                    <span>
                      {payInfo
                        ? payInfo.individual_copayment +
                          payInfo.uninsured_payment
                        : null}
                      원
                    </span>
                  </div>
                  <hr className="divider"></hr>
                  <div
                    className="itemAmount"
                    id="patientTotalToggle"
                    onClick={() => setShow(!show)}
                  >
                    <span>환자부담 총액 ▼</span>
                    <span>
                      {payInfo
                        ? payInfo.individual_copayment +
                          payInfo.uninsured_payment
                        : null}
                      원
                    </span>
                  </div>
                  {show ? (
                    <div className="calcToggleContent">
                      <div className="patientTotal">
                        <span className="itemAmount">환자 부담 총액</span>
                        <div className="patientCalcDetail">
                          <div className="itemAmountDetail" id="calcDetailItem">
                            <span>- 본인 부담금</span>
                            <span>
                              {payInfo ? payInfo.individual_copayment : null}원
                            </span>
                          </div>
                          <div className="itemAmountDetail" id="calcDetailItem">
                            <span>- 비급여</span>
                            <span>
                              {payInfo ? payInfo.uninsured_payment : null}원
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="itemAmount" id="NHIS">
                        <span>공단 부담금</span>
                        <span>{payInfo ? payInfo.nhis_copayment : null}원</span>
                      </div>
                      <hr className="divider"></hr>
                      <div className="itemAmount" id="totalExpense">
                        <span>진료비 총액</span>
                        <span>
                          {payInfo
                            ? payInfo.individual_copayment +
                              payInfo.uninsured_payment +
                              payInfo.nhis_copayment
                            : null}
                          원
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="received">
                  <div className="itemAmount">
                    <span className="title">수납 금액</span>
                    <span>
                      {payInfo
                        ? payInfo.individual_copayment +
                          payInfo.uninsured_payment
                        : null}
                      원
                    </span>
                  </div>
                  <hr className="divider"></hr>
                  <div className="itemAmount" id="paidBy">
                    <span>11.01&nbsp;&nbsp;&nbsp;&nbsp;카드</span>
                    <span>
                      {payInfo
                        ? payInfo.individual_copayment +
                          payInfo.uninsured_payment
                        : null}
                      원
                    </span>
                  </div>
                  <div className="addPayment">
                    <span>+ 수납 추가</span>
                  </div>
                </div>
                <div className="remaining">
                  <div className="itemAmount">
                    <span className="title">남은 금액</span>
                    <span>0원</span>
                  </div>
                </div>
              </div>

              <div className="paymentButtonWrapper">
                <button
                  className="paymentButton"
                  onClick={onSubmitHandler}
                  form="payment"
                >
                  수납 완료
                </button>
              </div>
            </form>

            <div className="paymentContentItem" id="itemDoc">
              <span className="title">문서 발급</span>
              <div className="documentListWrapper">
                <ul className="documentList">
                  <li className="documentListItem">건강검진증명서</li>
                  <li className="documentListItem">진료확인서</li>
                  <li className="documentListItem">진단서</li>
                  <li className="documentListItem">처방전(약국보관용)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="MDList">
          <div className="MDTitle">
            <span className="title">MD 리스트</span>
            <span>▼</span>
          </div>
          {/* <form className="form" action="/" method="GET">
            <input
              className="md-search-field"
              type="search"
              placeholder="오더세트 검색"
            />
            <button className="search-button" type="submit">
              <img
                className="md-searchIcon"
                src={process.env.PUBLIC_URL + "/icons/search50_999.png"}
              />
            </button>
          </form> */}
          <div className="mdHistory">
            <ul className="visitList">
              {results.result.map((item) => (
                <li className="MDListItem" key={item.id}>
                  {item.name} {item.volume}
                  {item.unit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Payment() {
  const title = "원무";
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

  useEffect(() => {
    // console.log('get patient info')
    getPatientInfo();
  }, []);

  return (
    <div className="Payment">
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
