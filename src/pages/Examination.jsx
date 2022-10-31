import './Examination.css'
import LeftNav from "../components/LeftNav/LeftNav"
import TopBar from "../components/TopBar/TopBar"
import PatientList from "../components/PatientList/PatientList"
import { useNavigate } from 'react-router-dom';
import UseModal from '../hooks/UseModal';
import { useEffect, useState } from "react";
import axios from "axios";


function Content() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [visits, setVisits] = useState([]);
    const [firstVisit, setFirstVisit] = useState();

    const getVisits = async() => {
        const response = await axios.get(
            "http://3.35.231.145:8080/api/visit/list"
        );
        setVisits(response.data.result);
        setLoading(false);
    };
    useEffect(() => {
        getVisits();
    }, []); //한 번만 동작함
    // console.log(visits)

    //환자 리스트 중 status가 1인 사람 중 checkup_time이 가장 빠른 사람만 구하기
    useEffect(() => {
        const tmpStatus1Visits = visits.filter((p) => p.status === 1);
        const tmpFirstVisit = tmpStatus1Visits.sort(
          (a, b) => Date.parse(a.checkup_time) - Date.parse(b.checkup_time)
        );
        setFirstVisit(tmpFirstVisit)
        // console.log(firstVisit);
    }, [visits])

    // useEffect(() => {
    //     console.log(firstVisit)
    // }, [firstVisit])

    return (
        <div className="content">
            <div className="homeMenu">
                {/* <div class="Searchbar">
                    <form className="Form" action="/" method="GET">
                        <input className="Search-field" type="search" placeholder="이름으로 환자 검색"/>
                        <button className="Search-button" type="submit">
                            <img className='SearchIcon' src={ process.env.PUBLIC_URL + '/icons/search50_999.png' } />
                        </button>
                    </form>
                </div> */}
                
                <div className="homeMenuItem" id="long" >
                    <span className="homeMenuItemTitle">진료실</span>
                    {loading
                        ? ( <div>Loading...</div> )
                        : ( !firstVisit[0]
                            ? <span className="homeMenuItemDetail" style={{color:'gray'}}> 진료대기 환자가 없습니다.</span>
                            : <span className="homeMenuItemDetail" key={firstVisit[0].pid}>{firstVisit[0].name}<br></br>건강보험 일반진료 1진료실</span>
                    )}
                    {/* {loading ? (
                        <div>Loading...</div>
                        ) : (
                        // <span className="homeMenuItemDetail" style={{color:'gray'}}> 진료대기 환자가 없습니다.</span>
                        <span className="homeMenuItemDetail" key={firstVisit[0].pid}>{firstVisit[0].name}<br></br>건강보험 일반진료 1진료실</span>
                    )} */}
                    <div className="homeMenuButton">
                        <button
                            className="homeMenuItemButton"
                            onClick={() => {navigate(`/chart/${firstVisit[0].pid}`)}}
                        >
                            진료 진행하기
                    </button>
                    </div>
                </div>

                <div className="homeMenuItem">
                    <span className="homeMenuItemTitle">신환 등록</span>
                    <span>신규환자를 등록하시겠습니까?</span>
                    <div className="homeMenuButton">
                        {/* <button>신환 등록하기</button> */}
                        <UseModal></UseModal>
                    </div>
                </div>
                <div className="homeMenuItem">
                    <span className="homeMenuItemTitle">MD 등록 관리</span>
                    <span>MD 제품들을 라이브러리에</span>
                    <span>미리 등록하고 관리할 수 있습니다.</span>
                    <div className="homeMenuButton">
                        <button className="homeMenuItemButton">MD 관리하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Examination() {
    const title = "진료"

    return (
        <div className="examination">
            <div className="container">
                <LeftNav />
                <div className='topbarContainer'>
                    <TopBar title={title}/>
                    <div className='patientlistContainer'>
                        <PatientList/>
                        <Content />
                    </div>
                </div>
                {/* <div className=""> page </div> */}
            </div>
        </div>
    )
}
