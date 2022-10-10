import './Reception.css'



function Content(){
    return(
        <div className="display">
            {/* <div className="patientSummary">
                <div>
                    <span style={{fontWeight:"bold"}}>김메디&nbsp;&nbsp;</span>
                    <span>여, 25세</span>
                </div>
                <span>체온 37&nbsp;&nbsp;체중 55&nbsp;&nbsp;신장 160&nbsp;&nbsp;혈압 129/87&nbsp;&nbsp;혈당 86</span>
            </div> */}
            <div className="receptionContainer">
                <div className="visitHistory">
                    <span className="title"> 최근방문기록</span>
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
                        <span className="title" style={{fontSize:"1.3em"}}>외래접수</span>
                        <span>2022-10-05 10:55 🖊</span>
                    </div>
                    <div className="receptionContentWrapper">
                        <span className="title">진료 기록</span>
                    </div>
                    <div className="receptionContentWrapper">
                        <span className="title">진단 및 처방</span>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default function Reception(){
    return(
        <div className="receptionContainer">
            <Content />
        </div>
    )
}
