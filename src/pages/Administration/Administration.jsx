import "./Administration.css";
import LeftNav from "../../components/LeftNav/LeftNav";
import TopBar from "../../components/TopBar/TopBar";
import PatientList from "../../components/PatientList/PatientList";
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Registration from "../PatientRegistration/Registration";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";

function Content() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const [firstVisit, setFirstVisit] = useState();

  const handleClick = (props) => {
    props.ref.current.focus();
  };
  const getVisits = async () => {
    const response = await axios.get(
      "http://54.180.106.181:8080/api/visit/list"
    );
    setVisits(response.data.result);
    setLoading(false);
  };
  useEffect(() => {
    getVisits();
  }, []); //한 번만 동작함
  // console.log(visits)

  //환자 리스트 중 status가 2인 사람 중 checkup_time이 가장 빠른 사람만 구하기
  useEffect(() => {
    const tmpStatus2Visits = visits.filter((p) => p.status === 3);
    const tmpFirstVisit = tmpStatus2Visits.sort(
      (a, b) => Date.parse(a.checkup_time) - Date.parse(b.checkup_time)
    );
    setFirstVisit(tmpFirstVisit);
    // console.log(firstVisit);
  }, [visits]);

  return (
    <div className="content">
      <div className="administrationHomeMenu">
        <div class="Searchbar">
          <SearchBar placeholder="이름으로 검색" />
        </div>
        <div className="homeMenuItem" id="long">
          <span className="homeMenuItemTitle">수납실</span>
          {loading ? (
            <div>Loading...</div>
          ) : !firstVisit[0] ? (
            <span className="homeMenuItemDetail" style={{ color: "gray" }}>
              {" "}
              수납대기 환자가 없습니다
            </span>
          ) : (
            <span className="homeMenuItemDetail" key={firstVisit[0].pid}>
              {firstVisit[0].name}
              <br></br>건강보험 일반진료 1진료실
            </span>
          )}
          <div className="homeMenuButton">
            {/* <Link to = "/payment"> */}
            <button
              className="homeMenuItemButton"
              onClick={() => {
                navigate(`/payment/${firstVisit[0].pid}`);
              }}
            >
              수납 진행하기
            </button>
            {/* </Link> */}
          </div>
        </div>

        <div className="homeMenuItem">
          <span className="homeMenuItemTitle">신환 등록</span>
          <span>신규환자를 등록하시겠습니까?</span>
          <div className="homeMenuButton">
            {/* <button>신환 등록하기</button> */}
            <Registration></Registration>
          </div>
        </div>
        <div className="homeMenuItem">
          <span className="homeMenuItemTitle">접수 신청</span>
          <span>등록한 환자를 접수하시겠습니까?</span>
          <div className="homeMenuButton">
            <button className="homeMenuItemButton" onClick={handleClick}>
              접수하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Administration() {
  const title = "원무";

  return (
    <div className="Administration">
      <div className="container">
        <LeftNav />
        <div className="topbarContainer">
          <TopBar title={title} />
          <div className="patientlistContainer">
            <PatientList />
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}
