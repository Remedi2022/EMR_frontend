import './PatientList.css'
import Visitor from "../Axios/Visitor";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PatientList() {
    const [loading, setLoading] = useState(true);
    const [visitors, setVisitors] = useState([]);

    const getVisitors = async() => {
        const response = await axios.get(
            "http://3.35.231.145:8080/api/visitor/list"
        );
        setVisitors(response.data.result);
        setLoading(false);
    };
    useEffect(() => {
        getVisitors();
    }, []); //한 번만 동작함
    console.log(visitors)

    return (
        <div className='patientlist'>
            <div className='patientlistWrapper'>
                <span id='listTitle'>환자 리스트</span>
                <div className='patientlistMenu' id='waiting'>
                    <span className='patientlistTitle'>🌒 진료 대기</span>
                    <div className="patientlistListWrapper">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <ul className='patientlistList'>
                                {visitors.map((visitor) => (
                                    <Visitor
                                        key={visitor.pid}
                                        type={1}
                                        status={visitor.status}
                                        name={visitor.name}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className='patientlistMenu' id='reservation'>
                    <span className='patientlistTitle'>🌓 수납 대기</span>
                    <div className="patientlistListWrapper">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <ul className='patientlistList'>
                                {visitors.map((visitor) => (
                                    <Visitor
                                        key={visitor.pid}
                                        type={2}
                                        status={visitor.status}
                                        name={visitor.name}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className='patientlistMenu' id='today'>
                    <span className='patientlistTitle'>🌕 오늘</span>
                    <div className="patientlistListWrapper" id="todayWrapper">
                        {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <ul className='patientlistList' id="todaylistlist">
                                    {visitors.map((visitor) => (
                                        <li className='patientlistItem' key={visitor.pid}>
                                            {visitor.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}
