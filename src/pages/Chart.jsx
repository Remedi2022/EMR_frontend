import './Chart.css'
import LeftNav from "../components/LeftNav/LeftNav"
import TopBar from "../components/TopBar/TopBar"
import PatientList from "../components/PatientList/PatientList"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VitalSign from '../components/Axios/VitalSign';
import useAsync from '../_api/useAsync';
import { Link } from 'react-router-dom';


async function getMD(id) {
    const response = await axios.get(
        `http://3.35.231.145:8080/api/md/${id}`
    );
    return response.data.result;
}

async function getMDList() {
    const response = await axios.get(
      'http://3.35.231.145:8080/api/md/list'
    );
    return response.data.result;
  }


function Content() {
    const [mdId, setMDId] = useState(null);
    const [state, refetch] = useAsync(getMDList, [], true);
    const { loading, data: mdlist, error } = state; // state.data 를 users 키워드로 조회
    
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [items, setItems] = useState([]);

    const inputItems = (md) => {
        const tmpItems = [...items]
        // console.log(tmpItems.length)
        for (let i = 0; i < tmpItems.length; i++) {
            if (tmpItems[i].id === md.id) {
                return
            }
        }
        tmpItems.push(md)
        setItems(tmpItems)
    }
    
    if (loading) return <div> MDList 로딩중..</div>;
    if (error) return <div> MDList에서 에러가 발생했습니다</div>;
    if (!mdlist) return null;
    
    


    function MDList(){
        // const [mdId, setMDId] = useState(null);
        // const [state, refetch] = useAsync(getMDList, [], true);
        // const { loading, data: mdlist, error } = state; // state.data 를 users 키워드로 조회
        // console.log("MDList에서 state는 ",state);
        if (loading) return <div> MDList 로딩중..</div>;
        if (error) return <div> MDList에서 에러가 발생했습니다</div>;
        if (!mdlist) return null;
        
        return(
            <div className="mdHistory">  
                <ul className='visitList'>
                    {mdlist.map(md => (
                    <li className="MDListItem" 
                        key={md.id} 
                        onClick={() => inputItems(md)}
                    >
                        {md.name}
                    </li>
                ))}
                </ul>
                
            </div>
            // <div className="MDPrescription">
            //     {mdId && <MD id={mdId} />}
            //  </div>
        ); 

    }

    // function MD({ id }) {
    //     const [state] = useAsync(() => getMD(id), [id]);
    //     const { loading, data: md, error } = state;
    //     // console.log("MD에서 state는 ",state);
    //     // console.log("id: ",id)
    //     if (loading) return <div>MD 로딩중..</div>;
    //     if (error) return <div>MD 에러가 발생했습니다</div>;  
    //     if (!md) return null;

    //     return(
    //         <li className="MDItem">
    //             {md.itemName}
    //         </li>
    //     )
    // }

    

//     useEffect(() => {
//         const fetchUsers = async () => {
//         try {
//             // 요청이 시작 할 때에는 error 와 users 를 초기화하고
//             setError(null);
//             // setItems(null);
//             setItems(null);
//             // loading 상태를 true 로 바꿉니다.
//             setLoading(true);
//             const response = await axios.get(
//             'http://3.35.231.145:8080/api/md/list'
//             );
            
//             setItems(response.data.result);  // 데이터는 response.data 안에 들어있습니다.
//             console.log(response.data);
//         } catch (e) {
//             setError(e);
//         }
//       setLoading(false);
//     };

//     fetchUsers();
//     }, []);

//   if (loading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다</div>;
//   if (!items) return null;

    return (
        <div className="content">
            <div className="patientSummary">
                <div>
                    <span style={{fontWeight:"bold"}}>우성주&nbsp;&nbsp;</span>
                    <span>여, 25세</span>
                </div>
                {/* <span><VitalSign /></span> */}
                {/* <span>체온 37&nbsp;&nbsp;체중 55&nbsp;&nbsp;신장 160&nbsp;&nbsp;혈압 129/87&nbsp;&nbsp;혈당 86</span> */}
            </div>
            <div className="chartContainer">
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
                    <span className="addChart">
                        진료 완료
                    </span>
                </div>

                <form id="chart" className="chartWrapper">
                    <span className="title">🖊 2022-08-03&nbsp;</span>
                    <span>김의사</span>
                    <div className="chartContentWrapper">
                        <span className="title">진료 기록</span>
                        <hr className="divider"></hr>
                        <div className="diagnoisRecord">
                            <textarea className="record"></textarea>
                        </div>
                    </div>
                    <div className="chartContentWrapper">
                        <span className="title">진단 및 처방</span>
                        <hr className="divider"></hr>
                        <div className="diagnoisRecord">
                            <textarea className="chartRecord"></textarea>
                        </div>
                        <div className="diagnoisRecord">
                            <textarea className="record"></textarea>
                        </div>
                        <select className="infoButton" name="fee">
                                <option value="first">초진진찰료</option>
                                <option value="notfirst">재진진찰료</option>
                        </select>
                        <div className="MDPrescriptionWrapper">
                        {/* {l?l.map((item) =>{
                            return(
                                <div className="MDPrescription">
                                    <li className='MDItem'>
                                        {mdId && <MD id={mdId} />}
                                    </li>
                                    <div className="amountList">
                                        <input className="amountInput" type="number" placeholder="1" min="1"></input>
                                        <input className="amountInput" type="number" placeholder="1" min="1"></input>
                                        <input className="amountInput" type="number" placeholder="1" min="1"></input>
                                        <span className="amount">용법</span>
                                    </div>
                            </div>)}
                            ):<></>
                        } */}
                        {
                            items.map(item => {
                                return (
                                    <div key={item.id} className="MDPrescription">
                                        <div className='MDItem'>
                                            {item.name}
                                        </div>
                                        <div className="amountList">
                                            <input className="amountInput" 
                                                    type="number" 
                                                    
                                                    placeholder="1" 
                                                    min="0"
                                                    style={{color:"black"}}
                                                    >
                                            </input>
                                            <input className="amountInput" 
                                                    type="number" 
                                                    
                                                    placeholder="1" 
                                                    min="0"
                                                    style={{color:"black"}}
                                                    >
                                            </input>
                                            <input className="amountInput" 
                                                    type="number" 
                                                    
                                                    placeholder="1" 
                                                    min="0"
                                                    style={{color:"black"}}
                                                    >
                                            </input>
                                            <span className="amount">용법</span>
                                        </div>
                                    </div>
                            )

                            })
                        }
                            
                        </div>
                        {/* {l?l.map((item) =>{
                            return(
                                <div className="MDPrescription">
                                    <MD />
                                <li key={item.id}  className='MDItem'>
                                    {item.itemName}
                                </li>
                                    <div className="amountList">
                                        <input className="amountInput" type="number" placeholder="1" min="1"></input>
                                        <input className="amountInput" type="number" placeholder="1" min="1"></input>
                                        <input className="amountInput" type="number" placeholder="1" min="1"></input>
                                        <span className="amount">용법</span>
                                    </div>
                            </div>)}
                            ):<></>
                        } */}
                            
                    </div>
                </form>

                <div className="MDList">
                    <div className="MDTitle">
                        <span className="title">MD 리스트</span>
                        <span>▼</span>
                    </div>
                    <form className="form" action="/" method="GET">
                        <input className="md-search-field" type="search" placeholder="오더세트 검색"/>
                        <button className="search-button" type="submit">
                            <img className='md-searchIcon' src={ process.env.PUBLIC_URL + '/icons/search50_999.png' } />
                        </button>
                    </form>
                    
                    <div className="mdHistory">    
                        <ul className='visitList'>
                            <MDList />
                            
                            {/* {mdlist.map(item =>(
                                <li className="MDListItem" key={item.id} onClick={() => setMDId(item.id)}>
                                    {item.name}
                                </li>
                                onClick={(item)=>{handleClick(item)}}
                            ) )} */}
                            



                            {/* {items.map(item =>(
                                <li 
                                    className='MDListItem' 
                                    key={item.id} 
                                    onClick={(item)=>{handleClick(item)}}
                                >
                                    {item.name} {item.volume}{item.unit}
                                </li>
                                // onClick={()=>{item=>handleClick(item);setItemId(item.id)}}
                            ))} */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Chart() {
    const title = "진료"

    return (
        <div className="Chart">
            <div className="container">
                <LeftNav />
                <div className='topbarContainer'>
                    <TopBar title={title}/>
                    <div className='patientlistContainer'>
                        <PatientList/>
                        <Content />
                    </div>
                </div>
            </div>
        </div>
    )
}