import './Payment.css'
import LeftNav from "../components/LeftNav/LeftNav"
import TopBar from "../components/TopBar/TopBar"
import PatientList from "../components/PatientList/PatientList"
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Content() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);
    const [show, setShow] = useState(true)
    
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
            'http://3.35.231.145:8080/api/md/list'
            );
            setResults(response.data);  // 데이터는 response.data 안에 들어있습니다.
            console.log(response.data);
        } catch (e) {
            setError(e);
        }
      setLoading(false);
    };

    fetchUsers();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!results) return null;

    return (
        <div className="content">
            <div className="patientSummary">
                <div>
                    <span style={{fontWeight:"bold"}}>김메디&nbsp;&nbsp;</span>
                    <span>여, 25세</span>
                </div>
                <span>체온 37&nbsp;&nbsp;체중 55&nbsp;&nbsp;신장 160&nbsp;&nbsp;혈압 129/87&nbsp;&nbsp;혈당 86</span>
            </div>
            <div className="paymentContainer">
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
                </div>

                <div className="paymentWrapper">
                    <div className="paymentDate">
                        <span className="title">🖊 2022-08-03&nbsp;</span>
                        <span>김의사</span>
                    </div>

                    <div className="paymentContentWrapper">
                        <div className="paymentContentItem" id="itemPay">
                            <span className="title">수납 내역</span>
                            <div className="toBeReceived">
                                <div className="itemAmount">
                                    <span className="title">받을 금액</span>
                                    <span>45,000원</span>
                                </div>
                                <hr className="divider"></hr>
                                <div className="itemAmount" id="patientTotalToggle" onClick={()=>setShow(!show)}>
                                    <span>환자부담 총액 ▼</span>
                                    <span>45,000원</span>
                                </div>
                                { show ?
                                <div className="calcToggleContent">
                                    <div className="patientTotal">
                                        <span className="itemAmount">환자 부담 총액</span>
                                        <div className="patientCalcDetail">
                                            <div className="itemAmountDetail" id="calcDetailItem">
                                                <span>- 본인 부담금</span>
                                                <span>40,000원</span>
                                            </div>
                                            <div className="itemAmountDetail" id="calcDetailItem">
                                                <span>- 비급여</span>
                                                <span>5,000원</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itemAmount" id="NHIS">
                                        <span>공단 부담금</span>
                                        <span>80,000원</span>
                                    </div>
                                    <hr className="divider"></hr>
                                    <div className="itemAmount" id="totalExpense">
                                        <span>진료비 총액</span>
                                        <span>125,000원</span>
                                    </div>
                                </div> : null }
                            </div>
                            <div className="received">
                                <div className="itemAmount">
                                    <span className="title">수납 금액</span>
                                    <span>45,000원</span>
                                </div>
                                <hr className="divider"></hr>
                                <div className="itemAmount" id="paidBy">
                                    <span>10.30&nbsp;&nbsp;&nbsp;&nbsp;카드</span>
                                    <span>45,000원</span>
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
                        <div className="paymentContentItem" id="itemDoc">
                            <span className="title">문서 발급</span>
                            <div className="documentListWrapper">
                                <ul className='documentList'>
                                    <li className='documentListItem'>
                                        건강검진증명서
                                    </li>
                                    <li className='documentListItem'>
                                        진료확인서
                                    </li>
                                    <li className='documentListItem'>
                                        진단서
                                    </li>
                                    <li className='documentListItem'>
                                        처방전(약국보관용)
                                    </li>
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
                    <form className="form" action="/" method="GET">
                        <input className="md-search-field" type="search" placeholder="오더세트 검색"/>
                        <button className="search-button" type="submit">
                            <img className='searchIcon' src={ process.env.PUBLIC_URL + '/icons/search50_999.png' } />
                        </button>
                    </form>
                    <div className="mdHistory">
                        <ul className='visitList'>
                            {results.result.map(item =>(
                                <li className='MDListItem' key={item.id}>
                                    {item.name} {item.volume}{item.unit}
                                </li>
                            ))}
                        </ul>
                    </div>
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
