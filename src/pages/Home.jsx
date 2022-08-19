import React from "react"
import './Home.css'
import LeftNav from "../components/LeftNav/LeftNav"

function Content() {
    return (
        <div className="content">
            <div className="homeMenu">
                <div className="homeMenuItem">
                    <span className="homeMenuItemTitle">원무</span>
                    <span className="homeMenuItemDetail">신환 등록 / 접수 / 수납이 필요하신가요?</span>
                    {/* <div className="buttonWrapper"> */}
                        <button>원무 바로가기</button>
                    {/* </div> */}
                </div>
                <div className="homeMenuItem">
                    <span className="homeMenuItemTitle">진료</span>
                    <span className="homeMenuItemDetail">진료 관련 업무를 보시나요?</span>
                    {/* <div className="buttonWrapper"> */}
                        <button>진료 바로가기</button>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <div className="Home">
            <div className="container">
                <LeftNav />
                <Content />
                {/* <div className=""> page </div> */}
            </div>
        </div>

    // <div class="container">
	//     <div class="item">LEFT_NAV</div>
	//     <div class="item">MAIN</div>
	//     <div class="item">helloflex</div>
    // </div>
    )
}
