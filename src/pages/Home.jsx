// import React from "react"
import './Home.css'
import LeftNav from "../components/LeftNav/LeftNav"
import HomeTopBar from '../components/TopBar/HomeTopBar';
import { Link } from 'react-router-dom';

function Content() {
    return (
        <div className="content">
            <div className="homeMenu">
                <div className="homeMenuItem">
                    <span className="homeMenuItemTitle">원무</span>
                    <span className="homeMenuItemDetail">신환 등록 / 접수 / 수납이 필요하신가요?</span>
                    {/* <div className="buttonWrapper"> */}
                    <div className="homeMenuButton">
                        <Link to = "/administration">
                            <button className="homeMenuItemButton">원무 바로가기</button>
                        </Link>
                    </div>
                    {/* </div> */}
                </div>
                <div className="homeMenuItem">
                    <span className="homeMenuItemTitle">진료</span>
                    <span className="homeMenuItemDetail">진료 관련 업무를 보시나요?</span>
                    {/* <div className="buttonWrapper"> */}
                    <div className="homeMenuButton">
                        <Link to = "/examination">
                            <button className="homeMenuItemButton">진료 바로가기</button>
                        </Link>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    const title = "홈"

    return (
        <div className="Home">
            <div className="container">
                <LeftNav />
                <div className='topbarContainer'>
                    <HomeTopBar title={title}/>
                    <Content />
                </div>
            </div>
        </div>
    )
}
