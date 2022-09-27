import './PatientList.css'

export default function PatientList() {
    return (
        <div className='patientlist'>
            <div className='patientlistWrapper'>
                <span id='listTitle'>환자 리스트</span>
                <div className='patientlistMenu' id='waiting'>
                    <span className='patientlistTitle'>🌝 대기</span>
                    <ul className='patientlistList'>
                        <li className='patientlistItem'>
                            우성주
                        </li>
                        <li className='patientlistItem'>
                            우주성
                        </li>
                        <li className='patientlistItem'>
                            성주우
                        </li>
                    </ul>
                </div>
                <div className='patientlistMenu' id='reservation'>
                    <span className='patientlistTitle'>🌚 예약</span>
                    <ul className='patientlistList'>
                        <li className='patientlistItem'>
                            주성우
                        </li>
                        <li className='patientlistItem'>
                            주우성
                        </li>
                        <li className='patientlistItem'>
                            성우주
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}