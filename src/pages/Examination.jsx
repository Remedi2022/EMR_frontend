import './Examination.css'
import LeftNav from "../components/LeftNav/LeftNav"
import TopBar from "../components/TopBar/TopBar"
import PatientList from "../components/PatientList/PatientList"
import { Link } from 'react-router-dom';
import UseModal from '../hooks/UseModal';



function Content() {
    return (
        <div className="content">
            <div className="homeMenu">
                <div class="Searchbar">
                    <form className="Form" action="/" method="GET">
                        <input className="Search-field" type="search" placeholder="이름 / 전화번호 / 생년월일(6자리) / 환자번호로 검색"/>
                        <button className="Search-button" type="submit">
                            <img className='SearchIcon' src={ process.env.PUBLIC_URL + '/icons/search50_999.png' } />
                        </button>
                    </form>
                </div>
                <div className="homeMenuItem" id="long">
                    <span className="homeMenuItemTitle">수납실</span>
                    <span className="homeMenuItemDetail">김우주 여 31세 #VIP<br></br>(텍스트별 크기 조정하기)건강보험 일반진료 박원장</span>
                    <div className="homeMenuButton">
                        <Link to = "/chart">
                            <button>진료 진행하기</button>
                        </Link>
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
                        <button>MD 관리하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Examination() {
    return (
        <div className="examination">
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
    )
}
