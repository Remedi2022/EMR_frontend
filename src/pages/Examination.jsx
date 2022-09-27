import './Examination.css'
import LeftNav from "../components/LeftNav/LeftNav"
import TopBar from "../components/TopBar/TopBar"
import PatientList from "../components/PatientList/PatientList"


function Content() {
    return (
        <div className="content">
            <div className="patientSummary">
                <div>
                    <span style={{fontWeight:"bold"}}>김메디&nbsp;&nbsp;</span>
                    <span>여, 25세</span>
                </div>
                <span>체온 37&nbsp;&nbsp;체중 55&nbsp;&nbsp;신장 160&nbsp;&nbsp;혈압 129/87&nbsp;&nbsp;혈당 86</span>
            </div>
            <div className="examinationContainer">
                <div className="visitHistory">
                    <span className="title">내원 이력</span>
                    <ul className='visitList'>
                        <li className='patientlistItem'>
                            2022-06-19 김의사
                        </li>
                        <li className='patientlistItem'>
                            2022-08-03 김의사
                        </li>
                    </ul>
                    <div className="addChart">
                        🖊 새 차트 생성
                    </div>
                </div>

                <div className="examinationWrapper">
                    <span className="title">🖊 2022-08-03&nbsp;</span>
                    <span>김의사</span>
                    <div className="examinationContentWrapper">
                        <span className="title">진료 기록</span>
                        <hr className="divider"></hr>
                    </div>
                    <div className="examinationContentWrapper">
                        <span className="title">진단 및 처방</span>
                        <form className="form" action="/" method="GET">
                            <input className="order-search-field" type="search" placeholder="오더 검색"/>
                            <button className="search-button" type="submit">
                                <img className='searchIcon' src={ process.env.PUBLIC_URL + '/icons/search50_999.png' } />
                            </button>
                        </form>
                        <hr className="divider"></hr>
                        <div className="mdAmount">
                            <li className='mdItem'>
                                아토베리어 크림 MD
                            </li>
                            <div className="amounts">
                                <span className="amount">1</span>
                                <span className="amount">1</span>
                                <span className="amount">1</span>
                            </div>
                        </div>
                        
                        <div className="mdAmount">
                            <li className='mdItem'>
                                아토베리어 로션 MD
                            </li>
                            <div className="amounts">
                                <span className="amount">1</span>
                                <span className="amount">1</span>
                                <span className="amount">1</span>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="MDList">
                    <span className="title">MD 리스트</span>
                    <span className="mdlistToggle">▼ </span>
                    <ul className='visitList'>
                        <li className='mdlistItem'>
                            아토베리어 크림 MD
                        </li>
                        <li className='mdlistItem'>
                            아토베리어 로션 MD
                        </li>
                        <li className='mdlistItem'>
                             제로이드 인텐시브 크림 MD 80ml
                        </li>
                        <li className='mdlistItem'>
                             에피세람
                        </li>
                        <li className='mdlistItem'>
                             뮤테라실
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default function Payment() {
    return (
        <div className="Payment">
            <div className="container">
                <LeftNav />
                <div className='topbarContainer'>
                    <TopBar />
                    <div className='patientlistContainer'>
                        <PatientList/>
                        <Content />
                    </div>
                </div>
            </div>
        </div>
    )
}
