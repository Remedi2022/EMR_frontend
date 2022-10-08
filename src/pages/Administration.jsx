import './Administration.css'
import LeftNav from "../components/LeftNav/LeftNav"
import TopBar from "../components/TopBar/TopBar"
import PatientList from "../components/PatientList/PatientList"
import { Link } from 'react-router-dom';
import UseModal from '../hooks/UseModal';



function Content() {
    const m = UseModal();

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
                    <span className="homeMenuItemDetail">이메디 남 17개월 #VIP<br></br>(텍스트별 크기 조정하기)건강보험 일반진료 1진료실</span>
                    <div className="homeMenuButton">
                        <Link to = "/Payment">
                            <button>수납 진행하기</button>
                        </Link>
                    </div>
                </div>
                <div className="homeMenuItem">
                    <span className="homeMenuItemTitle">신환 등록</span>
                    <span className="homeMenuItemDetail">신규환자를 등록하시겠습니까?</span>
                    <div className="homeMenuButton">
                        {/* <button>신환 등록하기</button> */}
                        <UseModal></UseModal>
                    </div>
                </div>
                <div className="homeMenuItem">
                    <span className="homeMenuItemTitle">접수 신청</span>
                    <span className="homeMenuItemDetail">우성주 여 23세 #단골 #실손보험</span>
                    <div className="homeMenuButton">
                        <button>접수하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Administration() {
    return (
        <div className="Administration">
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
