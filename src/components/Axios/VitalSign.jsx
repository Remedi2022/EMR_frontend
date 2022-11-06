import { useEffect, useState } from "react";
import axios from "axios";

export default function VitalSign(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [vitalSigns, setVitalSigns] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            // setItems(null);
            setVitalSigns(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            const response = await axios.get(
                'http://3.35.231.145:8080/api/visit/info?pid=${pid}'
                // `http://3.35.231.145:8080/api/visit/info?pid=${pid}`
            // 'http://3.35.231.145:8080/api/md/list'
            );
            
            setVitalSigns(response.data);  // 데이터는 response.data 안에 들어있습니다.
            
        } catch (e) {
            setError(e);
        }
      setLoading(false);
    };

    fetchUsers();
    }, []);



if (loading) return <div>로딩중..</div>;
if (error) return <div>에러가 발생했습니다</div>;
if(!vitalSigns) return null;


    return(
        <div>
        {vitalSigns.map(vitalSigns =>(
            <li className='MDListItem' key={VitalSign.id}>
                체온 {VitalSign.temperature} 체중 {VitalSign.weight} 신장 {VitalSign.height} 혈압 {VitalSign.blood_pressure_high}/{VitalSign.blood_pressure_low} 혈당{VitalSign.blood_sugar}
            </li>
        ))}
        </div>
    )
}

// <span className="vitalSign">{patientVS ? patientVS.temperature : ''}</span>