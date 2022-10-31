import './PatientList.css'
import Visit from "../Axios/Visit";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PatientList() {
    const [loading, setLoading] = useState(true);
    const [visits, setVisits] = useState([]);

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
                                {visits.map((visit) => (
                                    <Visit
                                        key={visit.id}
                                        type={1}
                                        status={visit.status}
                                        name={visit.name}
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
                                {visits.map((visit) => (
                                    <Visit
                                        key={visit.id}
                                        type={2}
                                        status={visit.status}
                                        name={visit.name}
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
                                    {visits.map((visit) => (
                                        <li className='patientlistItem' key={visit.id}>
                                            {visit.name}
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
